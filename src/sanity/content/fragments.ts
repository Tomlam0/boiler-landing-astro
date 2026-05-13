/**
 * Reusable GROQ projection body for image fields declared with
 * `options: { hotspot: true }`.
 *
 * `crop` and `hotspot` are stored as siblings of `asset` on the image field.
 * If the projection omits them, the editor's cropping in Sanity Studio has
 * no effect on the rendered URL — `urlFor()` falls back to the raw asset.
 *
 * Usage:
 *   image{ ${IMAGE_FRAGMENT} }
 *   carouselPhotos[]{ _key, ${IMAGE_FRAGMENT} }
 */
export const IMAGE_FRAGMENT = `asset->{ _id, url, metadata { lqip } }, alt, crop, hotspot`;
