/**
 * T7 stub — footer.
 *
 * The drawn signature from T4 mounts here; give it a stable target with
 * `data-signature-target="footer"`. The footer is intentionally not a
 * `data-section`: the scroll meter stops at Contact (06).
 */
export function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-line bg-surface-sunken py-16 md:py-24"
    >
      <div className="u-container min-h-[30svh]">
        <h2 className="sr-only">Footer</h2>
        <span data-signature-target="footer" className="block h-20 w-48" />
      </div>
    </footer>
  );
}
