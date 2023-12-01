import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from 'src/lib/utils'

interface ICheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * Use this to make Checkbox a controlled component.
   * If you pass in `checked`, you must also pass in `setChecked`.
   */
  checked?: CheckboxPrimitive.CheckedState
  /**
   * Use this to make Checkbox a controlled component.
   * If you pass in `setChecked`, you must also pass in `checked`.
   */
  setChecked?: React.Dispatch<
    React.SetStateAction<CheckboxPrimitive.CheckedState>
  >
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  ICheckboxProps
>(
  (
    {
      checked: checkedControlled,
      setChecked: setCheckedControlled,
      className,
      ...props
    },
    ref
  ) => {
    const [checkedUncontrolled, setCheckedUncontrolled] =
      React.useState<CheckboxPrimitive.CheckedState>(
        props.defaultChecked ?? false
      )
    if (
      (checkedControlled !== undefined && setCheckedControlled === undefined) ||
      (checkedControlled === undefined && setCheckedControlled !== undefined)
    ) {
      throw new Error(
        'You must pass in both `checked` and `setChecked`, or neither.'
      )
    }
    const checked = checkedControlled ?? checkedUncontrolled
    const setChecked = setCheckedControlled ?? setCheckedUncontrolled

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'focus-ring disabled:disabled-classes flex h-5 w-5 shrink-0 items-center justify-center rounded-default border shadow-sm transition-colors duration-500',
          'border-neutral-300 bg-light text-light data-[state=checked]:border-primary-700 data-[state=checked]:bg-primary-700 data-[state=checked]:active:bg-primary-900 data-[state=unchecked]:active:bg-neutral-200',
          className
        )}
        checked={checked}
        onCheckedChange={setChecked}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          className={cn('flex items-center justify-center text-current')}
        >
          <svg
            id="check"
            key="check"
            className="h-3 w-3 text-light"
            width="283.333333px"
            height="216.666667px"
            viewBox="0 0 283.333333 216.666667"
          >
            <AnimatePresence>
              {checked && (
                <motion.polyline
                  id="check-mark"
                  key="check-mark"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-191.6667, -225)"
                  stroke="currentColor"
                  strokeWidth="50"
                  points="216.666667 350 283.333333 416.666667 450 250"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)

export default Checkbox
