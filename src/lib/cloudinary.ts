const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

/** Full-quality delivery URL for a site image, auto format + quality, optional width hint. */
export function cldImageUrl(publicId: string, width?: number): string {
  const transform = width ? `f_auto,q_auto:eco,w_${width}` : "f_auto,q_auto:eco";
  return `${BASE}/image/upload/${transform}/${publicId}`;
}

/** Standard responsive width ladder, capped at the image's intended max width. */
export const RESPONSIVE_WIDTHS = [400, 640, 800, 960, 1280, 1600, 1920, 2560];

/** srcset string so the browser fetches only the size it actually needs. */
export function cldSrcSet(publicId: string, maxWidth: number): string {
  const widths = RESPONSIVE_WIDTHS.filter((w) => w <= maxWidth);
  if (widths[widths.length - 1] !== maxWidth) widths.push(maxWidth);
  return widths.map((w) => `${cldImageUrl(publicId, w)} ${w}w`).join(", ");
}

/** Tiny, heavily blurred instant-loading placeholder (LQIP) for the blur-up effect. */
export function cldPlaceholderUrl(publicId: string): string {
  return `${BASE}/image/upload/w_32,e_blur:1000,q_1,f_auto/${publicId}`;
}

/** Full-quality video delivery URL, auto format + quality. */
export function cldVideoUrl(publicId: string): string {
  return `${BASE}/video/upload/f_auto,q_auto:eco/${publicId}`;
}

/** Blurred low-res frame grabbed from a video, used as its LQIP placeholder poster. */
export function cldVideoPlaceholderUrl(publicId: string): string {
  return `${BASE}/video/upload/so_0,w_32,e_blur:1000,q_1,f_jpg/${publicId}.jpg`;
}
