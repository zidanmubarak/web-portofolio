import { Section } from "@/components/ui/section";
import { LocalClock } from "@/components/shell/local-clock";
import { links } from "@/content/links";
import { profile } from "@/content/profile";
import { ContactForm } from "./contact/contact-form";
import { ContactReveal } from "./contact/contact-reveal";
import { CopyEmail } from "./contact/copy-email";

const elsewhere = links.filter((link) => link.primary && link.id !== "email");

/**
 * Contact — 06 (design-direction.md §4.8).
 *
 * The only paper surface besides the hero plate: reading turns into writing.
 * The email address is the primary action; the form is the alternative route.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      meta={
        <span className="flex items-center justify-end gap-3">
          <span className="hidden sm:inline">
            {profile.location.city}, {profile.location.countryCode}
          </span>
          <LocalClock />
        </span>
      }
      surface="paper"
      labelledBy="contact-heading"
      bodyClassName="lg:pr-14"
    >
      <ContactReveal>
        <div className="u-grid items-end gap-y-8">
          <h2
            id="contact-heading"
            className="u-display col-span-4 text-[clamp(3.5rem,8.4vw,8.5rem)] leading-[0.86] tracking-[-0.04em] lg:col-span-8"
          >
            Let&apos;s make
            <br />
            something
            <br />
            legible.
          </h2>

          <p className="col-span-4 max-w-[34ch] text-small leading-relaxed text-paper-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end lg:text-right">
            Tell me what you&apos;re building. A sentence about the role, the
            project, or the problem is enough.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-paper-muted py-5 md:mt-14">
          <a
            href={`mailto:${profile.email}`}
            className="link-wipe text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-[-0.01em] text-paper-ink"
          >
            {profile.email}
          </a>
          <CopyEmail email={profile.email} />
        </div>

        <div className="u-grid mt-12 gap-y-12 md:mt-16">
          <div className="col-span-4 lg:col-span-7">
            <ContactForm />
          </div>

          <div className="col-span-4 lg:col-span-4 lg:col-start-9">
            <p className="u-label text-paper-muted">Elsewhere</p>
            <ul className="mt-4 border-t border-paper-muted">
              {elsewhere.map((link) => (
                <li key={link.id} className="border-b border-paper-muted py-4">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="link-wipe text-body">{link.label}</span>
                    <span className="u-label text-paper-muted">
                      {link.handle}
                      <span aria-hidden="true" className="ml-2">
                        ↗
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[30ch] text-small leading-relaxed text-paper-muted">
              The form replies from this address. Nothing is added to a list.
            </p>
          </div>
        </div>
      </ContactReveal>
    </Section>
  );
}
