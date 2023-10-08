import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const buttonVariants = cva(
  'rounded-default inline-flex items-center justify-center font-semibold transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      colors: {
        primary: [
          'bg-primary-700',
          'text-white',
          'hover:bg-primary-700/90',
          'focus-ring',
        ],
        secondary: [
          'bg-white',
          'text-neutral-900',
          'ring-1',
          'ring-inset',
          'ring-neutral-300',
        ],
        soft: [
          'bg-primary-50',
          'text-primary-600',
          'hover:bg-primary-100',
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
      colors: 'primary',
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
    { colors, size, className, asChild = false, pill = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ colors, size, className }),
          pill && 'rounded-full'
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Button
