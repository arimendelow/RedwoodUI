import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import tailwindDefaults from 'tailwindcss/defaultConfig'

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

/**
 * This hook returns true if the screen width is less than or equal to the configured breakpoint
 */
export const useSmallScreen = () => {
  /**
   * Set the breakpoint, in pixels, for when the screen should be considered "mobile".
   * This is used by the `useSmallScreen` hook.
   * By default, this is set to the `sm` breakpoint in Tailwind CSS.
   */
  const twSm = (tailwindDefaults.theme?.screens as Record<string, string>)['sm']
  const MOBILE_BREAKPOINT: number = twSm ? parseInt(twSm) : 640

  const [isSmallScreen, setIsSmallScreen] = React.useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  )

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= MOBILE_BREAKPOINT)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return isSmallScreen
}

// Custom hook for observing 'data-state' attribute changes
export function useDataStateObserver<T>(
  ref: React.RefObject<HTMLElement>
): T | undefined {
  const [dataState, setDataState] = React.useState<T>()

  React.useEffect(() => {
    if (!ref.current) return // Ensure the element exists

    // Create a MutationObserver to observe 'data-state' attribute changes
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-state'
        ) {
          const value = (mutation.target as HTMLElement).getAttribute(
            'data-state'
          )
          if (value) {
            setDataState(value as T)
          }
        }
      })
    })

    // Start observing the 'data-state' attribute
    observer.observe(ref.current, { attributes: true })

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return dataState
}

export function useDataAttributeAsState<T>(
  element: HTMLElement | null
): T | null {
  const [dataState, setDataState] = React.useState<T | null>(null)

  React.useEffect(() => {
    if (element) {
      // Get the 'data' attribute as an object
      const dataAttributes = element.dataset
      setDataState(dataAttributes as unknown as T) // You should provide the expected type for T here
    }
  }, [element])

  return dataState
}

export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
