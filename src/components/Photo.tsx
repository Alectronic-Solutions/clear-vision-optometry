import { asset } from "@/lib/site";

interface PhotoProps {
  /** Path prefix of pre-sized WebP files, e.g. `/images/frames/f001`. */
  src: string;
  /** The two widths generated for this image, smallest first. */
  widths: [number, number];
  /** Intrinsic aspect ratio, used for width/height to prevent layout shift. */
  aspect: [number, number];
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/**
 * Static-export friendly responsive image. next/image can't generate srcsets
 * without an image server, so the variants are produced ahead of time.
 */
export default function Photo({ src, widths, aspect, alt, sizes, className, priority }: PhotoProps) {
  const [small, large] = widths;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`${src}-${small}.webp`)}
      srcSet={`${asset(`${src}-${small}.webp`)} ${small}w, ${asset(`${src}-${large}.webp`)} ${large}w`}
      sizes={sizes}
      width={large}
      height={Math.round((large * aspect[1]) / aspect[0])}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
