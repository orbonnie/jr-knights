export function cloudinaryImage(path: string, size = 600) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${size},h_${Math.round(
    size * 1.25,
  )},c_fill,g_face/${path}`;
}

export function cloudinaryUrl(path: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto/${path}`;
}

// Cloudinary does the resizing/format conversion
// `src` is the Cloudinary public path, not a full URL.
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_${
    quality ?? "auto"
  },w_${width},c_limit/${src}`;
}
