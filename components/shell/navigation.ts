import { copy } from "@/content/copy.en";

/**
 * Structural navigation for the shell.
 *
 * Mirrors design-direction.md §4.10 and the section order in
 * `app/page.tsx`. Labels and numbers come from `content/copy.en.ts` so the
 * index, the section rails and a future Indonesian copy file stay in sync.
 */
export type MenuItem = {
  index: string;
  label: string;
  href: string;
};

export const MENU_ITEMS: readonly MenuItem[] = copy.nav.items.map(
  ({ index, label, href }) => ({ index, label, href })
);
