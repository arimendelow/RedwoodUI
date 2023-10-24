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
