import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Returns the object if it is in the browser, otherwise returns an empty object.
 * This is useful for ensuring that the object is only used in the browser.
 * @param obj - The object to check.
 * @returns The object if it is in the browser, otherwise an empty object.
 */
export function useClient<T>(obj: T): T {
  if (typeof globalThis.window === 'undefined') {
    return {} as T;
  }
  return obj;
}
 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 
 
 
/**
 * ### Get the src of an image
 * #### Note: This should not be needed but importing `Images` is not consistent between various bundlers.
 * This function is used to get the src of an imported asset. It is used in the `Image` component.
 * @param image - The image to get the src of
 * @returns The src of the image
 * @example
 * getImageSrc('https://example.com/image.jpg') // 'https://example.com/image.jpg'
 * getImageSrc({ src: 'https://example.com/image.jpg' }) // 'https://example.com/image.jpg'
 * getImageSrc({ src: 'https://example.com/image.jpg', alt: 'Example Image' }) // 'https://example.com/image.jpg'
 *
 */
export function getImageSrc(image: string | { src: string } | any) {
  if (typeof image === 'string') {
    return image;
  }
  return image.src;
}
