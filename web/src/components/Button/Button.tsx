import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const buttonVariants = cva(
  'rounded-default inline-flex items-center justify-center font-semibold transition-colorTreatment disabled:disabled-classes',
  {
    variants: {
      colorTreatment: {
        primary: [
          'bg-primary-700 dark:bg-primary-500',
          'text-light',
          'hover:bg-primary-700/90 dark:hover:bg-primary-500/90',
          'focus-ring',
        ],
        secondary: [
          'bg-dark/10 dark:bg-light/10',
          'hover:bg-dark/20 dark:hover:bg-light/20',
          'text-dark dark:text-light',
          'focus-ring',
        ],
        soft: [
          'bg-primary-50 dark:bg-primary-900/50',
          'text-primary-600 dark:text-light/90',
          'hover:bg-primary-100 dark:hover:bg-primary-900/80',
          'focus-ring',
        ],
        minimal: [
          'bg-transparent',
          'text-primary-600 dark:text-light/90',
          'hover:bg-primary-50 dark:hover:bg-primary-900/80',
          'focus-ring',
        ],
        danger: [
          'bg-red-600 dark:bg-red-700',
          'text-light',
          'hover:bg-red-700 dark:hover:bg-red-800',
          'focus-ring',
        ],
      },
      size: {
        xs: ['text-xs', 'py-1', 'px-2'],
        sm: ['text-sm', 'py-1', 'px-2'],
        base: ['text-sm', 'py-1.5', 'px-2.5'],
        lg: ['text-sm', 'py-2', 'px-3'],
        xl: ['text-sm', 'py-2.5', 'px-3.5'],
      },
    },
    defaultVariants: {
      colorTreatment: 'primary',
      size: 'base',
    },
  }
)

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    IBaseComponentProps {
  pill?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { colorTreatment, size, className, asChild = false, pill = false, ...rest },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ colorTreatment, size, className }),
          pill && 'rounded-full'
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

export default Button
