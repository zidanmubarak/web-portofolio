import { Section } from "@/components/ui/section";
import { getSiteContent } from "@/content/server";
import { ServicesList } from "./services/services-list";

/**
 * Services - 02 (design-direction.md §4.4).
 *
 * The server owns the copy and the evidence lookup; only the opening rows and
 * their FLIP motion live on the client.
 */
export async function Services() {
  const { copy, services, projects, experience } = await getSiteContent();

  return (
    <Section
      id="services"
      index="02"
      label={copy.services.label}
      meta={copy.services.meta}
      labelledBy="services-heading"
      bodyClassName="lg:pr-14"
    >
      <div className="u-grid items-end gap-y-6">
        <h2
          id="services-heading"
          className="u-display col-span-4 max-w-[16ch] text-title lg:col-span-7"
        >
          {copy.services.heading.join(" ")}.
        </h2>
        <p className="col-span-4 max-w-[42ch] text-small leading-relaxed text-ink-muted lg:col-span-4 lg:col-start-9">
          {copy.services.intro}
        </p>
      </div>

      <ServicesList
        services={services}
        projects={projects}
        experience={experience}
        proofLabel={copy.services.proofLabel}
      />
    </Section>
  );
}
