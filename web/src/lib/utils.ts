import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines the features of `clsx` and `twMerge`.
 * - `clsx` allows for conditional class concatenation, which is useful when you want to apply classes based on certain conditions.
 * - `twMerge` efficiently merges Tailwind CSS classes, ensuring there are no style conflicts. This is particularly useful when using utility-first CSS frameworks like Tailwind CSS where class order can affect the final look of the element.
 *
 * By using both, we can conditionally apply classes and also ensure that the final class string is conflict-free and optimized.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
