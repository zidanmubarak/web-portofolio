/**
 * T7 owns this file from here on. The stub keeps the anchor, the accessible
 * page heading, and the hero's viewport height so scroll/anchor testing works
 * before the real composition lands.
 *
 * The hero deliberately has no section rail: it is the masthead, not an
 * indexed chapter. `data-section` stays for in-page tracking, `data-index` is
 * omitted so the scroll meter starts at 01 About.
 */
export function Hero() {
  return (
    <section
      id="hero"
      data-section="hero"
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="relative min-h-svh bg-surface pt-[var(--topbar-h)]"
    >
      <div className="u-container flex min-h-[calc(100svh-var(--topbar-h))] flex-col justify-end pb-12">
        <h1 id="hero-heading" className="sr-only">
          Zidan Mubarak — AI/ML engineer
        </h1>
      </div>
    </section>
  );
}
