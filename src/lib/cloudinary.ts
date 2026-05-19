export function cloudinaryImage(path: string, size = 600) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${size},h_${Math.round(
    size * 1.25,
  )},c_fill,g_face/${path}`;
}
