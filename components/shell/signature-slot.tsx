import { cn } from "@/lib/utils";

/**
 * Logo / signature slot.
 *
 * `data-signature-target="topbar"` is the stable contract T4 uses for the
 * loader's final transition. It is an empty 36/40 px box to the left of the
 * wordmark: the drawn signature lands there and fades, so it never sits on top
 * of the readable name (QA-09). Do not move or rename the attribute.
 */
export function SignatureSlot({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        data-signature-target="topbar"
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center md:h-10 md:w-10"
      />
      <span
        data-signature-label
        className="u-label text-[0.6875rem] md:text-[0.8125rem]"
      >
        {name}
      </span>
    </span>
  );
}
