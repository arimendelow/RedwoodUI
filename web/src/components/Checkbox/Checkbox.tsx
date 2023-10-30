import { CheckIcon } from '@heroicons/react/24/solid'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from 'src/lib/utils'

interface ICheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checked?: CheckboxPrimitive.CheckedState
  setChecked?: React.Dispatch<
    React.SetStateAction<CheckboxPrimitive.CheckedState>
  >
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ICheckboxProps
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'focus-ring disabled:disabled-classes flex h-5 w-5 shrink-0 items-center justify-center rounded-default border border-neutral-300 shadow-sm',
        ' bg-light text-primary-700',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <CheckIcon className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

export default Checkbox
