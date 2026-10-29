/**
 * Structural navigation for the shell.
 *
 * Mirrors design-direction.md §4.10: the index menu carries the same numbers
 * as the section rails. Labels are UI chrome, not editorial copy; T9 can move
 * this list into `content/` once the nav data in `content/copy.en.ts` is
 * reconciled with the final section order (About, Services, Work, Record,
 * Tools, Contact).
 */
export type MenuItem = {
  index: string;
  label: string;
  href: string;
};

export const MENU_ITEMS: readonly MenuItem[] = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Services", href: "#services" },
  { index: "03", label: "Work", href: "#work" },
  { index: "04", label: "Record", href: "#record" },
  { index: "05", label: "Tools", href: "#tools" },
  { index: "06", label: "Contact", href: "#contact" },
];
