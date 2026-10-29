import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { Button } from "@/components/ui/button";
import { Field, TextInput, TextArea } from "@/components/ui/field";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { MotionLab } from "./motion-lab";
import { copy } from "@/content/copy.en";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "RUBRIC — design system specimen",
  robots: { index: false, follow: false },
};

const PALETTE = [
  {
    token: "--bg",
    value: "#0B0B0A",
    role: "Page surface",
    contrast: "base",
  },
  {
    token: "--bg-elevated",
    value: "#141412",
    role: "Rows, panels",
    contrast: "15.82:1 with --fg",
  },
  {
    token: "--bg-sunken",
    value: "#070706",
    role: "Footer, menu",
    contrast: "base",
  },
  {
    token: "--fg",
    value: "#F2EDE4",
    role: "Primary text",
    contrast: "16.89:1 on --bg",
  },
  {
    token: "--muted",
    value: "#9A968C",
    role: "Metadata",
    contrast: "6.67:1 on --bg",
  },
  {
    token: "--line",
    value: "#2B2A26",
    role: "Hairline",
    contrast: "1.45:1 (non-text)",
  },
  {
    token: "--line-strong",
    value: "#3D3B35",
    role: "Active border",
    contrast: "2.13:1 (non-text)",
  },
  {
    token: "--accent",
    value: "#FF4A2E",
    role: "Rubric / output",
    contrast: "5.88:1 on --bg",
  },
  {
    token: "--accent-hover",
    value: "#FF6A4D",
    role: "Hover",
    contrast: "6.96:1 on --bg",
  },
  {
    token: "--accent-ink",
    value: "#111110",
    role: "Text on accent",
    contrast: "5.64:1",
  },
  {
    token: "--paper",
    value: "#E7E1D5",
    role: "Portrait, contact",
    contrast: "base",
  },
  {
    token: "--paper-ink",
    value: "#111110",
    role: "Text on paper",
    contrast: "14.51:1",
  },
  {
    token: "--paper-muted",
    value: "#5F5B52",
    role: "Metadata on paper",
    contrast: "5.19:1",
  },
] as const;

const TYPE_SCALE = [
  {
    token: "--fs-mega",
    name: "Mega",
    spec: "clamp(4rem, 15vw, 13.5rem) · 600 · wdth 78 · −0.055em",
    sample: "Zidan Mubarak",
    className:
      "u-display text-mega leading-[var(--lh-mega)] tracking-[var(--tracking-mega)]",
  },
  {
    token: "--fs-display",
    name: "Display",
    spec: "clamp(3rem, 8.5vw, 7.5rem) · 600 · −0.035em",
    sample: "Six projects worth your time",
    className: "u-display text-display leading-[var(--lh-display)]",
  },
  {
    token: "--fs-title",
    name: "Title",
    spec: "clamp(2.25rem, 4.5vw, 4rem) · 500",
    sample: "AI / ML engineering",
    className: "u-display text-title",
  },
  {
    token: "--fs-heading",
    name: "Heading",
    spec: "clamp(1.5rem, 2.2vw, 2rem) · 500",
    sample: "Data provenance, honest evaluation",
    className: "text-heading font-medium",
  },
  {
    token: "--fs-lead",
    name: "Lead",
    spec: "clamp(1.125rem, 1.45vw, 1.375rem) · 1.4",
    sample: copy.hero.intro,
    className: "text-lead max-w-[52ch]",
  },
  {
    token: "--fs-body",
    name: "Body",
    spec: "1rem · 1.55",
    sample: profile.about[2],
    className: "text-body max-w-[65ch]",
  },
  {
    token: "--fs-small",
    name: "Small",
    spec: "0.8125rem · 1.45",
    sample: "Captions, sources, form hints.",
    className: "text-small max-w-[65ch]",
  },
  {
    token: "--fs-label",
    name: "Label",
    spec: "0.6875rem · 0.12em · uppercase · tabular",
    sample: "Banda Aceh, ID · 17:42 WIB · 05.5483 N / 95.3238 E",
    className: "u-label",
  },
] as const;

function SpecSection({
  id,
  index,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-section={id}
      data-index={index}
      data-label={title}
      className="border-t border-line py-16 md:py-24"
    >
      <div className="u-container grid gap-10 md:grid-cols-12">
        <div className="min-w-0 md:col-span-3">
          <p className="u-label text-accent">{index}</p>
          <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-[34ch] text-small text-ink-muted">
              {description}
            </p>
          ) : null}
        </div>
        <div className="min-w-0 md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function StylePage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="pb-24 pt-[var(--topbar-h)]">
      <header className="u-container pb-16 pt-16 md:pb-24 md:pt-24">
        <h1 className="u-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-[var(--tracking-display)]">
          Rubric
        </h1>
        <div className="mt-8 grid gap-4 border-t border-line pt-4 md:grid-cols-12">
          <p className="u-label text-ink-muted md:col-span-5">
            Design system specimen — T6, Gerbang B
          </p>
          <p className="u-label text-ink-muted md:col-span-4">
            Archivo · Martian Mono · one accent
          </p>
          <p className="u-label text-ink md:col-span-3 md:text-right">
            Desktop / mobile
          </p>
        </div>
        <p className="mt-10 max-w-[58ch] text-lead text-ink-muted">
          A manuscript index for an ML practitioner: a dark reading room, one
          paper plate, and vermilion annotations. Everything below is built from
          the same tokens the sections receive.
        </p>
      </header>

      <SpecSection
        id="tokens"
        index="01"
        title="Colour"
        description="Measured ratios from design-direction.md §2.1. Muted text stays above AA on the reading-room surface."
      >
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Colour tokens, hex values, roles, and measured contrast ratios
          </caption>
          <thead>
            <tr className="u-label text-ink-muted">
              <th scope="col" className="border-b border-line py-3 pr-4 font-normal">
                Swatch
              </th>
              <th scope="col" className="border-b border-line py-3 pr-4 font-normal">
                Token
              </th>
              <th scope="col" className="border-b border-line py-3 pr-4 font-normal">
                Hex
              </th>
              <th scope="col" className="hidden border-b border-line py-3 pr-4 font-normal md:table-cell">
                Role
              </th>
              <th scope="col" className="hidden border-b border-line py-3 font-normal lg:table-cell">
                Contrast
              </th>
            </tr>
          </thead>
          <tbody>
            {PALETTE.map((colour) => (
              <tr key={colour.token} className="align-middle">
                <td className="border-b border-line py-3 pr-4">
                  <span
                    aria-hidden="true"
                    className="block h-6 w-10 border border-line"
                    style={{ backgroundColor: colour.value }}
                  />
                </td>
                <td className="u-mono border-b border-line py-3 pr-4 text-small">
                  {colour.token}
                </td>
                <td className="u-mono border-b border-line py-3 pr-4 text-small text-ink-muted">
                  {colour.value}
                </td>
                <td className="hidden border-b border-line py-3 pr-4 text-small md:table-cell">
                  {colour.role}
                </td>
                <td className="hidden border-b border-line py-3 text-small text-ink-muted lg:table-cell">
                  {colour.contrast}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="border border-line p-5">
            <p className="u-label text-ink-muted">Reading room</p>
            <p className="mt-3 text-small">
              <span className="text-accent">01</span> / accent on near-black.
              Accent is never long body text.
            </p>
          </div>
          <div className="u-paper p-5" data-surface="paper">
            <p className="u-label text-paper-muted">Paper plate</p>
            <p className="mt-3 text-small text-paper-ink">
              Ink 14.51:1. Focus switches to paper ink; accent is a border or a
              field, never text.
            </p>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        id="type"
        index="02"
        title="Type scale"
        description="Archivo for display and prose, Martian Mono for labels, indices, clocks and numerals. Display is uppercase; body is sentence case."
      >
        <dl className="divide-y divide-line border-y border-line">
          {TYPE_SCALE.map((entry) => (
            <div key={entry.token} className="grid gap-4 py-8 md:grid-cols-12">
              <dt className="md:col-span-3">
                <span className="u-label block text-ink">{entry.name}</span>
                <span className="u-mono mt-2 block text-small text-ink-muted">
                  {entry.token}
                </span>
                <span className="mt-1 block text-small text-ink-muted">
                  {entry.spec}
                </span>
              </dt>
              <dd className={`md:col-span-9 ${entry.className}`}>
                {entry.sample}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <p className="u-label text-ink-muted">Tabular check</p>
          <p className="u-mono text-heading">0123456789</p>
          <p className="u-mono text-heading text-ink-muted">82.5 → 17.4</p>
        </div>
      </SpecSection>

      <SpecSection
        id="grid"
        index="03"
        title="Grid and rhythm"
        description="4 columns on mobile, 12 from 1024 px. Page margin clamps to 48 px, max width 1680 px, gutter 16/24 px."
      >
        <div className="grid grid-cols-4 gap-grid lg:grid-cols-12">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="flex h-28 items-end border-x border-line bg-surface-elevated p-2"
            >
              <span className="u-label text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["--margin-page", "clamp(16px, 3.33vw, 48px)"],
            ["--gap-grid", "16px / 24px"],
            ["--section-y", "clamp(96px, 12vh, 200px)"],
            ["--radius", "0px"],
          ].map(([token, value]) => (
            <div key={token} className="border-t border-line pt-3">
              <dt className="u-label text-ink-muted">{token}</dt>
              <dd className="u-mono mt-2 text-small">{value}</dd>
            </div>
          ))}
        </dl>
      </SpecSection>

      <SpecSection
        id="primitives"
        index="04"
        title="Primitives"
        description="Every control is keyboard-operable, has a visible focus ring, and uses the same 1 px hairline language."
      >
        <div className="min-w-0 max-w-full space-y-14">
          <div>
            <h3 className="u-label text-ink-muted">Button</h3>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Button type="button" variant="solid">
                Send message
              </Button>
              <Button type="button" variant="outline">
                View selected work
              </Button>
              <Button type="button" variant="quiet" size="sm">
                Copy email
              </Button>
              <Button type="button" variant="outline" size="sm">
                Small
              </Button>
              <Button type="button" disabled>
                Disabled
              </Button>
              <Button href="#contact" variant="outline">
                Link button
              </Button>
            </div>
            <p className="mt-4 text-small text-ink-muted">
              Magnet pull: 4 px maximum on fine pointers, still on touch and
              reduced motion. Tab through to see the 2 px focus ring.
            </p>
          </div>

          <div>
            <h3 className="u-label text-ink-muted">TextLink</h3>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-10 gap-y-4">
              <TextLink href="#work">Selected work</TextLink>
              <TextLink href="https://github.com/zidanmubarak" external mark="↗">
                GitHub
              </TextLink>
              <TextLink href="#contact" mark="↓">
                Scroll to read
              </TextLink>
            </div>
          </div>

          <div>
            <h3 className="u-label text-ink-muted">Field (paper surface)</h3>
            <div className="mt-4 u-paper p-6 md:p-8" data-surface="paper">
              <div className="grid gap-8 md:grid-cols-2">
                <Field label="Name" htmlFor="specimen-name" required>
                  <TextInput
                    id="specimen-name"
                    name="specimen-name"
                    placeholder="Your name"
                    autoComplete="off"
                  />
                </Field>
                <Field
                  label="Email"
                  htmlFor="specimen-email"
                  hint="I reply from Banda Aceh."
                  required
                >
                  <TextInput
                    id="specimen-email"
                    name="specimen-email"
                    type="email"
                    placeholder="you@domain.com"
                    autoComplete="off"
                  />
                </Field>
                <Field
                  label="Message"
                  htmlFor="specimen-message"
                  error="This field is required."
                  className="md:col-span-2"
                >
                  <TextArea
                    id="specimen-message"
                    name="specimen-message"
                    aria-invalid="true"
                    aria-describedby="specimen-message-error"
                    placeholder="A sentence is enough."
                  />
                </Field>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button type="button" variant="solid">
                  Send
                </Button>
                <Button type="button" variant="paper">
                  Copy email
                </Button>
                <span className="text-small text-paper-muted">
                  Error text is ink, not accent; accent only marks the border.
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="u-label text-ink-muted">Reveal wrapper</h3>
            <Reveal
              variant="clip"
              className="mt-4 border border-line bg-surface-elevated p-6"
            >
              <p className="max-w-[52ch] text-small text-ink-muted">
                The <code className="u-mono">Reveal</code> wrapper exists so a
                section can opt into one pattern without hand-rolling a
                ScrollTrigger. Use it for a single element; coordinate siblings
                by calling the motion utility directly.
              </p>
            </Reveal>
          </div>

          <div>
            <h3 className="u-label text-ink-muted">Marquee — reserved</h3>
            <div className="mt-4 border border-line py-3">
              <Marquee label="Reserved marquee" speed={32}>
                <span className="u-label px-6 text-ink-muted">
                  Reserved primitive · not used in RUBRIC
                </span>
                <span aria-hidden="true" className="u-label px-6 text-accent">
                  /
                </span>
              </Marquee>
            </div>
            <p className="mt-3 text-small text-ink-muted">
              T2 rejected marquees for the homepage. The primitive ships for
              future use only; do not add it to a section without a new design
              decision.
            </p>
          </div>
        </div>
      </SpecSection>

      <SpecSection
        id="shell"
        index="05"
        title="Shell"
        description="The top bar is live on this page: name, location, WIB clock, INDEX. Open the INDEX overlay from the top-right and tab through it."
      >
        <dl className="divide-y divide-line border-y border-line">
          {[
            ["Top bar", "Fixed, 56/64 px, solid + hairline after 32 px"],
            ["INDEX overlay", "clip-path wipe, item stagger, focus trap, Escape"],
            ["Scroll meter", "1 px accent rule + right rail (desktop)"],
            ["Signature slot", 'data-signature-target="topbar" / "footer"'],
            ["Skip link", "First focus target, jumps to #main"],
          ].map(([term, value]) => (
            <div key={term} className="grid gap-2 py-4 md:grid-cols-12">
              <dt className="u-label text-ink-muted md:col-span-3">{term}</dt>
              <dd className="text-small md:col-span-9">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-6 border border-line p-5">
          <p className="u-label text-ink-muted">Signature target</p>
          <span
            data-signature-target="specimen"
            className="signature-slot inline-flex h-12 w-40 items-center justify-center border border-dashed border-line-strong"
          >
            <span className="u-label text-ink-muted">T4 mounts here</span>
          </span>
        </div>
      </SpecSection>

      <SpecSection
        id="motion"
        index="06"
        title="Motion"
        description="One language, not one effect. Each pattern belongs to a specific kind of content; reduced motion yields a complete static page."
      >
        <MotionLab />
      </SpecSection>

      <Section
        id="specimen-section"
        index="07"
        label="Section primitive"
        meta="anchor · index · label · meta"
        bodyClassName="pb-4"
      >
        <h3 className="text-heading font-medium">
          This block is the actual <code className="u-mono text-small">Section</code>{" "}
          component, not a drawing of it.
        </h3>
        <p className="mt-4 max-w-[60ch] text-small text-ink-muted">
          It owns the anchor, the mono rail, the top hairline, the paper surface
          switch, and the `data-section` hooks used by the scroll meter. T7
          supplies everything below the rail.
        </p>
      </Section>

      <div className="u-container mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-6">
        <p className="u-label text-ink-muted">
          Tokens mirrored in tailwind.config.ts · contracts.md is the API
        </p>
        <Link href="/" className="link-wipe u-label text-ink">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
