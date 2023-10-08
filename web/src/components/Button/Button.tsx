import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const btnVnts = cva(
  'rounded-default inline-flex items-center justify-center font-medium ring-offset-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled: disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: ['bg-primary-700', 'text-white', 'hover:bg-primary-700/90'],
        secondary: [
          'bg-primary-300',
          'text-primary-700',
          'hover:bg-primary-300/90',
        ],
      },
      size: {
        sm: ['text-sm', 'py-1', 'px-2'],
        base: ['text-base', 'py-2', 'px-4'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'base',
    },
  }
)

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnVnts>,
    IBaseComponentProps {}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ intent, size, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(btnVnts({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Button
