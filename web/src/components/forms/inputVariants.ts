import { cva } from 'class-variance-authority'

/**
 * This is a list of all the variants that is applied to all input fields
 */
export const inputFieldVariants = cva(
  'flex w-full rounded-default border border-neutral-300 bg-default px-3 py-2 text-dark dark:text-light placeholder:text-neutral-500 disabled:disabled-classes focus-ring',
  {
    variants: {
      size: {
        base: ['h-10', 'text-base'],
        grow: ['h-10', 'text-base', 'md:text-lg'],
      },
    },
  }
)
