import { SmartImage } from "./SmartImage";

/**
 * PageBanner, full-width 3:1 marketing banner at the very top of a
 * family or industry page.
 *
 * The delivered artwork is pre-composed with its own headline, so it is
 * rendered edge-to-edge and cropped with object-cover rather than
 * letterboxed. It is decorative: the page's real <h1>, intro and calls to
 * action stay in the semantic hero directly below, so nothing interactive
 * or readable only lives inside the image.
 */
export function PageBanner({
  src,
  alt,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  priority?: boolean;
}) {
  if (!src) return null;

  return (
    <div className="border-b border-line bg-midnight" data-page-banner="">
      <SmartImage
        src={src}
        alt={alt}
        fit="cover"
        className="mx-auto aspect-[3/1] w-full max-w-[min(96vw,2200px)]"
        imgClassName="object-center"
        sizes="100vw"
        priority={priority}
      />
    </div>
  );
}
