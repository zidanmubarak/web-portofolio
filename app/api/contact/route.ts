import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact endpoint.
 *
 * - Server-side validation is authoritative; the client only shortens the loop.
 * - Honeypot (`website`) is answered with a quiet 200 so bots do not learn.
 * - Rate limit is per instance (5 / 15 min). On a serverless deploy each warm
 *   instance keeps its own window; a shared store would need a new dependency.
 * - Errors never include SMTP hosts, credentials, or transport messages. All
 *   configuration comes from the existing EMAIL_* variables in `.env.example`.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_BODY_BYTES = 20_000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  message: 5000,
} as const;

type Bucket = number[];
const buckets = new Map<string, Bucket>();

const noStore = { "Cache-Control": "no-store" } as const;

function fail(status: number, body: Record<string, unknown> = { ok: false }) {
  return NextResponse.json(body, { status, headers: noStore });
}

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip") || "unknown";
}

function withinRateLimit(key: string): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((time) => now - time < WINDOW_MS);

  if (hits.length >= MAX_PER_WINDOW) {
    buckets.set(key, hits);
    return false;
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 500) {
    buckets.forEach((times, bucketKey) => {
      if (!times.some((time) => now - time < WINDOW_MS)) buckets.delete(bucketKey);
    });
  }

  return true;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return fail(403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413);

  let payload: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return fail(400);
    payload = parsed as Record<string, unknown>;
  } catch {
    return fail(400);
  }

  // Honeypot: a real client never fills this. Pretend it worked.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 200, headers: noStore });
  }

  if (!withinRateLimit(clientKey(request))) return fail(429);

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email).replace(/[\r\n]+/g, "");
  const subject = clean(payload.subject, LIMITS.subject).replace(
    /[\r\n]+/g,
    " "
  );
  const message = clean(payload.message, LIMITS.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Add your name.";
  if (!EMAIL.test(email))
    errors.email = "Use an address like you@company.com.";
  if (subject.length < 3) errors.subject = "Add a subject.";
  if (message.length < 10)
    errors.message = "A little more detail, please (10 characters or more).";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422, headers: noStore });
  }

  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || "587");
  const secure = process.env.EMAIL_SECURE === "true";
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const receiver = process.env.EMAIL_RECEIVER;

  if (!host || !Number.isFinite(port) || !user || !pass || !receiver) {
    // Configuration stays on the server; the client gets a generic failure.
    console.warn("[contact] SMTP is not configured; message was not sent.");
    return fail(503);
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: user,
      to: receiver,
      replyTo: email,
      subject: `Portfolio contact — ${subject}`,
      text: [
        "New message from the portfolio contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
      html: [
        "<p>New message from the portfolio contact form.</p>",
        `<p><strong>Name:</strong> ${escapeHtml(name)}<br />`,
        `<strong>Email:</strong> ${escapeHtml(email)}<br />`,
        `<strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      ].join(""),
    });

    return NextResponse.json({ ok: true }, { status: 200, headers: noStore });
  } catch {
    // No transport message, no host, no credentials in the response or logs.
    console.error("[contact] send failed.");
    return fail(502);
  }
}
