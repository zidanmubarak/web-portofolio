type SectionHeadProps = {
  number: string;
  title: string;
  meta: string;
  titleId: string;
  subdued?: boolean;
};

export function SectionHead({
  number,
  title,
  meta,
  titleId,
  subdued = false,
}: SectionHeadProps) {
  return (
    <div className="sec-head">
      <span
        className={`secnum num${subdued ? " sub" : ""}`}
        aria-hidden="true"
      >
        {number}
      </span>
      <h2 id={titleId}>{title}</h2>
      <p className="meta">{meta}</p>
    </div>
  );
}
