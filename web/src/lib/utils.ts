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

type PossibleRef<T> = React.Ref<T> | undefined

/**
 * Set a given ref to a given value.
 * This utility takes care of different types of refs: callback refs and RefObject(s).
 * Used by primarily by `composeRefs()`.
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref !== null && ref !== undefined) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}

/**
 * A utility to compose multiple refs together.
 * Accepts callback refs and RefObject(s).
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => setRef(ref, node))
}

/**
 * A custom hook that composes multiple refs.
 * Accepts callback refs and RefObject(s).
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs)
}
