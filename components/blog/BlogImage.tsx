import Image from "next/image";

/** Optimised via next/image for our own storage bucket; any other https host is shown as-is. */
export function BlogImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  let optimise = false;
  try {
    const url = new URL(src);
    optimise = url.hostname.endsWith(".supabase.co") && url.pathname.startsWith("/storage/v1/object/public/blog-images/");
  } catch {
    optimise = false;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!optimise}
      className={`object-cover ${className}`}
    />
  );
}
