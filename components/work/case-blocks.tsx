import type {
  CaseStudyBlock,
  CaseStudyDataset,
  CaseStudyMetric,
} from "@/content";
import { Reveal } from "@/components/ui/reveal";
import { Odometer } from "@/components/ui/odometer";
import { cn } from "@/lib/utils";

const pad = (value: number) => String(value).padStart(2, "0");

export function blockAnchor(block: CaseStudyBlock) {
  return `case-${block.id}`;
}

/** Rail label: `01 — Context` becomes `01` and `Context`. */
export function blockRailLabel(block: CaseStudyBlock) {
  const label = block.label ?? block.id;
  const [rawIndex, ...rest] = label.split("—");
  const index = rawIndex.trim();
  const short = rest.join("—").trim() || label;
  return { index, label: short };
}

export function CaseBlock({ block }: { block: CaseStudyBlock }) {
  const headingId = `${blockAnchor(block)}-heading`;

  return (
    <section
      id={blockAnchor(block)}
      aria-labelledby={
        "heading" in block && block.heading ? headingId : undefined
      }
      className="scroll-mt-[calc(var(--topbar-h)+32px)] border-t border-line pt-8 first:border-t-0 first:pt-0"
    >
      <p className="u-label text-accent">{block.label ?? block.id}</p>

      {"heading" in block && block.heading ? (
        <Reveal as="div" variant="lines" className="mt-4">
          <h2
            id={headingId}
            className="u-display max-w-[20ch] text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.94] tracking-[-0.03em] text-ink"
          >
            {block.heading}
          </h2>
        </Reveal>
      ) : null}

      {block.kind === "prose" ? <ProseBlock block={block} /> : null}
      {block.kind === "facts" ? <FactsBlock block={block} /> : null}
      {block.kind === "datasets" ? <DatasetsBlock block={block} /> : null}
      {block.kind === "steps" ? <StepsBlock block={block} /> : null}
      {block.kind === "metrics" ? <MetricsBlock block={block} /> : null}
      {block.kind === "list" ? <ListBlock block={block} /> : null}
    </section>
  );
}

function ProseBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "prose" }>;
}) {
  return (
    <div className="mt-6 max-w-[64ch] space-y-5">
      {block.paragraphs.map((paragraph, index) => (
        <p
          key={paragraph.slice(0, 32)}
          className={cn(
            index === 0 ? "text-lead text-ink" : "text-body text-ink-muted"
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function FactsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "facts" }>;
}) {
  return (
    <dl className="mt-6 border-t border-line">
      {block.items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 border-b border-line py-4 sm:grid-cols-[180px_1fr] sm:gap-8"
        >
          <dt className="u-label text-ink-muted">{item.term}</dt>
          <dd className="text-body text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DatasetsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "datasets" }>;
}) {
  return (
    <div className="mt-6">
      {block.intro ? (
        <p className="max-w-[56ch] text-body text-ink-muted">{block.intro}</p>
      ) : null}
      <div className="mt-6 border-t border-line">
        {block.items.map((item) => (
          <DatasetRow key={item.id} dataset={item} />
        ))}
      </div>
    </div>
  );
}

function DatasetRow({ dataset }: { dataset: CaseStudyDataset }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-6">
      <p className="u-label col-span-12 text-accent lg:col-span-2">
        {dataset.label}
      </p>
      <div className="col-span-12 lg:col-span-6">
        <p className="max-w-[52ch] text-body text-ink-muted">
          {dataset.description}
        </p>
      </div>
      <p className="u-display col-span-12 text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none text-ink lg:col-span-4 lg:text-right">
        {typeof dataset.count === "number" ? (
          <Odometer
            value={dataset.count}
            prefix={dataset.id === "authentic" ? "≈" : ""}
            label={dataset.countLabel}
            className="tabular-nums"
          />
        ) : (
          <span className="u-label text-ink-muted">—</span>
        )}
      </p>
    </div>
  );
}

function StepsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "steps" }>;
}) {
  return (
    <ol className="mt-6 border-t border-line">
      {block.steps.map((step) => (
        <li
          key={step.index}
          className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-line py-6"
        >
          <span className="u-label col-span-2 text-accent lg:col-span-1">
            {step.index}
          </span>
          <h3 className="u-display col-span-10 text-heading text-ink lg:col-span-4">
            {step.title}
          </h3>
          <p className="col-span-10 col-start-3 max-w-[56ch] text-body text-ink-muted lg:col-span-7 lg:col-start-6">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

function MetricsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "metrics" }>;
}) {
  return (
    <div className="mt-6">
      {block.intro ? (
        <p className="max-w-[56ch] text-body text-ink-muted">{block.intro}</p>
      ) : null}
      <div className="mt-6 border-t border-line">
        {block.metrics.map((metric) => (
          <MetricRow key={metric.id} metric={metric} />
        ))}
      </div>
      <p className="u-label mt-3 text-ink-muted">
        Accent bar = error remaining after fine-tuning, relative to the baseline.
      </p>
    </div>
  );
}

function formatMetric(value: number, metric: CaseStudyMetric) {
  return `${value.toFixed(metric.decimals)}${metric.unit}`;
}

function MetricRow({ metric }: { metric: CaseStudyMetric }) {
  const baseline = Math.max(metric.before, 0.0001);
  const remaining = Math.min(100, Math.max(0, (metric.after / baseline) * 100));

  return (
    <div className="border-b border-line py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="u-label text-ink">{metric.label}</p>
        <p className="u-label text-accent">
          −{metric.deltaPercent}% error
        </p>
      </div>
      <p className="mt-2 max-w-[58ch] text-small text-ink-muted">
        {metric.definition}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span className="u-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none text-ink-muted">
          {formatMetric(metric.before, metric)}
        </span>
        <span aria-hidden="true" className="text-lead text-accent">
          →
        </span>
        <span className="u-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none text-ink">
          {formatMetric(metric.after, metric)}
        </span>
      </div>

      <div
        className="mt-5 h-[2px] w-full bg-line"
        role="img"
        aria-label={`${metric.label}: ${formatMetric(metric.before, metric)} before, ${formatMetric(metric.after, metric)} after`}
      >
        <div className="h-[2px]" style={{ width: `${remaining}%` }}>
          <Reveal
            as="div"
            variant="clip"
            direction="left"
            className="h-[2px] w-full bg-accent"
            start="top 92%"
          >
            {" "}
          </Reveal>
        </div>
      </div>

      {metric.note ? (
        <p className="mt-3 max-w-[58ch] text-small text-ink-muted">
          {metric.note}
        </p>
      ) : null}
    </div>
  );
}

function ListBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { kind: "list" }>;
}) {
  return (
    <ol className="mt-6 border-t border-line">
      {block.items.map((item, index) => (
        <li
          key={item.slice(0, 32)}
          className="grid grid-cols-12 gap-x-4 border-b border-line py-4"
        >
          <span className="u-label col-span-2 text-ink-muted lg:col-span-1">
            {pad(index + 1)}
          </span>
          <p className="col-span-10 max-w-[68ch] text-body text-ink lg:col-span-11">
            {item}
          </p>
        </li>
      ))}
    </ol>
  );
}
