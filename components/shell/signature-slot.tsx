import { cn } from "@/lib/utils";

/**
 * Logo / signature slot.
 *
 * `data-signature-target="topbar"` is the stable contract T4 uses for the
 * loader's final transition. Do not move or rename the attribute; the loader
 * measures this box and lands the drawn signature inside it. The visible name
 * stays as text so the identity is readable before the SVG mounts.
 */
export function SignatureSlot({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      data-signature-target="topbar"
      className={cn(
        "signature-slot relative inline-flex items-center",
        className
      )}
    >
      <span data-signature-label className="u-label">
        {name}
      </span>
    </span>
  );
}
