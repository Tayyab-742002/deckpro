const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/** Full-quality delivery URL for a site image, auto format + quality, optional width hint. */
export function cldImageUrl(publicId: string, width?: number): string {
  const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return `${BASE}/image/upload/${transform}/${publicId}`;
}

/** Tiny, heavily blurred instant-loading placeholder (LQIP) for the blur-up effect. */
export function cldPlaceholderUrl(publicId: string): string {
  return `${BASE}/image/upload/w_32,e_blur:1000,q_1,f_auto/${publicId}`;
}

/** Full-quality video delivery URL, auto format + quality. */
export function cldVideoUrl(publicId: string): string {
  return `${BASE}/video/upload/f_auto,q_auto/${publicId}`;
}

/** Blurred low-res frame grabbed from a video, used as its LQIP placeholder poster. */
export function cldVideoPlaceholderUrl(publicId: string): string {
  return `${BASE}/video/upload/so_0,w_32,e_blur:1000,q_1,f_jpg/${publicId}.jpg`;
}
