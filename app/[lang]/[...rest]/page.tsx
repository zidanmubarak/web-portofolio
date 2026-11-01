import { notFound } from "next/navigation";

/**
 * Unknown paths stay inside the `[lang]` segment so the localized 404, shell
 * and language switch are available instead of Next's unstyled global page.
 */
export default function CatchAllPage() {
  notFound();
}
