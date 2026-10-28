/**
 * Skill name → brand mark in `public/icons/`. Nine of the twelve supplied
 * icons map to an entry that actually exists in the skills deck (both
 * locales); Streamlit, Docker and Linux have icons but no deck entry, so they
 * are deliberately not rendered (REVISIONS-v2 R1 — do not mislabel an entry).
 *
 * Matching is by normalized name, because the ID deck localises the label
 * ("Git dan GitHub") while the icon key must not be locale-dependent.
 */
const MATCHERS: { icon: string; test: (name: string) => boolean }[] = [
  { icon: "python", test: (name) => name === "python" },
  { icon: "pytorch", test: (name) => name === "pytorch" },
  { icon: "tensorflow", test: (name) => name === "tensorflow" },
  { icon: "scikitlearn", test: (name) => name === "scikit-learn" },
  { icon: "huggingface", test: (name) => name === "hugging face" },
  { icon: "pandas", test: (name) => name === "pandas" },
  { icon: "fastapi", test: (name) => name === "fastapi" },
  {
    icon: "git",
    test: (name) => /^git (and|dan) github$/.test(name),
  },
  { icon: "jupyter", test: (name) => name === "jupyter notebook" },
];

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export type SkillMark = { icon: string; src: string } | null;

export function skillIcon(name: string): SkillMark {
  const normalized = normalize(name);
  const match = MATCHERS.find((matcher) => matcher.test(normalized));
  return match ? { icon: match.icon, src: `/icons/${match.icon}.svg` } : null;
}
