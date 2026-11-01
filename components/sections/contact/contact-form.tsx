"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { useI18n } from "@/components/i18n/provider";

type FieldName = "name" | "email" | "subject" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "sending" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(
  values: Record<FieldName, string>,
  messages: FieldErrors
): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = messages.name;
  if (!EMAIL.test(values.email.trim())) errors.email = messages.email;
  if (values.subject.trim().length < 3) errors.subject = messages.subject;
  if (values.message.trim().length < 10)
    errors.message = messages.message;
  return errors;
}

/**
 * Contact form - the one interactive form on the site.
 *
 * The server is authoritative (`app/api/contact`); this only shortens the
 * round trip. Errors stay next to the field, the status line is polite, and
 * a failure never prints configuration or transport details.
 */
export function ContactForm() {
  const { copy, profile } = useI18n();
  const labels = copy.contact.form;
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values, labels.errors);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      setStatus("idle");
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(data.get("website") ?? ""),
        }),
      });

      if (response.ok) {
        formRef.current?.reset();
        setErrors({});
        setStatus("success");
        return;
      }

      const payload = (await response.json().catch(() => null)) as
        | { errors?: FieldErrors }
        | null;

      if (response.status === 422 && payload?.errors) {
        const localized: FieldErrors = {};
        for (const key of Object.keys(payload.errors) as FieldName[]) {
          localized[key] = labels.errors[key];
        }
        setErrors(localized);
        setStatus("idle");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
      className="flex flex-col gap-8"
    >
      <p className="u-label text-paper-muted">{labels.heading}</p>

      <div className="grid gap-8 md:grid-cols-2">
        <Field
          label={labels.name}
          htmlFor="contact-name"
          required
          error={errors.name}
        >
          <TextInput
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
        </Field>

        <Field
          label={labels.email}
          htmlFor="contact-email"
          required
          error={errors.email}
        >
          <TextInput
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={labels.emailPlaceholder}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
        </Field>
      </div>

      <Field
        label={labels.subject}
        htmlFor="contact-subject"
        required
        error={errors.subject}
      >
        <TextInput
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={labels.subjectPlaceholder}
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
        />
      </Field>

      <Field
        label={labels.message}
        htmlFor="contact-message"
        required
        error={errors.message}
        hint={labels.privacy}
      >
        <TextArea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={labels.messagePlaceholder}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "contact-message-error contact-message-hint"
              : "contact-message-hint"
          }
        />
      </Field>

      {/* Honeypot: off-canvas rather than display:none so bots still fill it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          type="submit"
          variant="solid"
          size="md"
          magnet={false}
          disabled={status === "sending"}
          className="w-full md:w-auto"
        >
          {status === "sending" ? labels.submitting + "…" : labels.submit + " →"}
        </Button>

        <p role="status" aria-live="polite" className="text-small">
          {status === "success" ? (
            <span className="text-paper-ink">
              {labels.success}
            </span>
          ) : null}
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-small text-paper-ink">
          {labels.error}{" "}
          <a href={`mailto:${profile.email}`} className="link-wipe">
            {profile.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
