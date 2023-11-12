import { cva } from 'class-variance-authority'

/**
 * This is a list of all the variants that is applied to all input fields
 */
export const inputFieldVariants = cva(
  'flex w-full rounded-default border bg-default px-3 py-2 placeholder:text-neutral-500 disabled:disabled-classes focus-ring transition-colors',
  {
    variants: {
      colorTreatment: {
        default: ['border-neutral-300', 'text-dark', 'dark:text-light'],
        error: [
          'border-red-700',
          'text-red-700',
          'placeholder:text-red-700/50',
          'dark:text-red-300',
        ],
      },
      /**
       * Using the `grow` variant will cause the input text to grow on larger screens.
       */
      inputTextSize: {
        base: ['text-base'],
        grow: ['text-base', 'md:text-lg'],
      },
    },
    defaultVariants: {
      colorTreatment: 'default',
      inputTextSize: 'base',
    },
  }
)
