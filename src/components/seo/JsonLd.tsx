type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Renders JSON-LD structured data. Server component — no client JS. */
export function JsonLd({ data }: Readonly<Props>) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content; '<' is escaped to prevent script breakout
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
