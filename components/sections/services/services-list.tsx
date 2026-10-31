"use client";

import * as React from "react";
import type { ExperienceEntry, Project, Service } from "@/content/types";
import {
  animateRowShift,
  revealPanel,
  snapshotRows,
  type RowSnapshot,
} from "@/lib/motion";

type ServicesListProps = {
  services: readonly Service[];
  projects: readonly Project[];
  experience: readonly ExperienceEntry[];
  proofLabel: string;
};

function evidenceLabel(
  id: string,
  projects: readonly Project[],
  experience: readonly ExperienceEntry[]
): string {
  return (
    projects.find((project) => project.slug === id)?.title ??
    experience.find((entry) => entry.id === id)?.role ??
    id
  );
}

/**
 * The index of four work areas. Hover/focus or tap opens one row; the
 * description is revealed with clip-path while the rows below shift with the
 * shared FLIP helper (no height tween).
 */
export function ServicesList({
  services,
  projects,
  experience,
  proofLabel,
}: ServicesListProps) {
  const list = React.useRef<HTMLUListElement>(null);
  const snapshot = React.useRef<RowSnapshot | null>(null);
  const previous = React.useRef<string | null>(services[0]?.id ?? null);
  const [active, setActive] = React.useState<string | null>(
    services[0]?.id ?? null
  );
  const activeRef = React.useRef<string | null>(active);

  const rows = React.useCallback(
    () =>
      Array.from(
        list.current?.querySelectorAll<HTMLElement>("[data-service-row]") ?? []
      ),
    []
  );

  const activate = React.useCallback(
    (id: string) => {
      if (activeRef.current === id) return;
      snapshot.current = snapshotRows(rows());
      activeRef.current = id;
      setActive(id);
    },
    [rows]
  );

  React.useLayoutEffect(() => {
    if (!list.current) return;

    if (snapshot.current) {
      animateRowShift(rows(), snapshot.current);
      snapshot.current = null;
    }

    if (active && active !== previous.current) {
      const panel = list.current.querySelector<HTMLElement>(
        `[data-service-panel="${active}"]`
      );
      if (panel) revealPanel(panel);
    }

    previous.current = active;
  }, [active, rows]);

  const hoverable = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  };

  return (
    <ul ref={list} className="mt-12 border-b border-line md:mt-16">
      {services.map((service) => {
        const isActive = active === service.id;
        const panelId = `service-panel-${service.id}`;
        const triggerId = `service-trigger-${service.id}`;

        return (
          <li
            key={service.id}
            data-service-row
            className="relative border-t border-line"
          >
            <h3 className="text-inherit">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isActive}
                aria-controls={panelId}
                data-active={isActive}
                onClick={() => activate(service.id)}
                onPointerEnter={() => {
                  if (hoverable()) activate(service.id);
                }}
                onFocus={() => activate(service.id)}
                className="group grid w-full grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-start gap-x-3 py-6 text-left md:grid-cols-[6rem_minmax(0,1fr)_1.5rem] md:items-baseline md:gap-x-6 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="u-display text-[clamp(1.5rem,3.2vw,3.5rem)] leading-none text-ink-muted transition-colors duration-micro group-data-[active=true]:text-accent"
                >
                  {service.index}
                </span>

                <span className="flex min-w-0 flex-col gap-2">
                  <span className="u-display text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.05] text-ink">
                    {service.title}
                  </span>
                  <span className="text-small leading-relaxed text-ink-muted md:text-[0.9375rem]">
                    {service.tagline}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="justify-self-end text-xl leading-none text-ink-muted transition-transform duration-300 ease-expo group-data-[active=true]:rotate-45 group-data-[active=true]:text-accent"
                >
                  +
                </span>

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-expo group-data-[active=true]:scale-x-100"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isActive}
              data-service-panel={service.id}
            >
              <div className="grid gap-6 pb-8 md:ml-[7.5rem] md:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] md:gap-10">
                <div>
                  <p className="max-w-[54ch] text-[0.9375rem] leading-relaxed text-ink-muted md:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                    {service.capabilities.map((capability, index) => (
                      <li
                        key={capability}
                        className="text-small leading-relaxed text-ink-muted"
                      >
                        {capability}
                        {index < service.capabilities.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="ml-3 text-line-strong"
                          >
                            ·
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="u-label text-ink-muted">{proofLabel}</p>
                  <ul className="mt-2 space-y-1">
                    {service.proof.map((id) => (
                      <li key={id} className="text-small text-ink">
                        {evidenceLabel(id, projects, experience)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
