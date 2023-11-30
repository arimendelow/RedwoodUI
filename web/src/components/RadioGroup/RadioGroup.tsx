import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { useController } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

interface IRadioGroupFormFieldProps extends IRadioGroupProps {
  name: string
}

const RadioGroupFormField = ({ name, ...props }: IRadioGroupFormFieldProps) => {
  const { field } = useController({ name, defaultValue: props.defaultValue })
  return <RadioGroup {...props} {...field} onValueChange={field.onChange} />
}

interface IRadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface IRadioGroupProps extends RadioGroupRootPropsType {
  options: IRadioGroupOption[]
  label?: string
  description?: string
}

const RadioGroup = ({
  options,
  label,
  description,
  ...props
}: IRadioGroupProps) => {
  return (
    <div>
      {(label || description) && (
        <div className="pb-5">
          {label && (
            <label className="text-color-default text-base font-semibold">
              {label}
            </label>
          )}
          {description && (
            <p className="text-neutral-500 dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      )}
      <RadioGroupRoot className="flex flex-col gap-2" {...props}>
        {options.map((option) => (
          <div
            key={option.value}
            className={cn(
              'flex items-start',
              option.disabled && 'disabled-classes'
            )}
          >
            <RadioGroupItemIndicator
              value={option.value}
              disabled={option.disabled}
              id={option.value}
              className="mt-1"
            />
            <div className="ml-3 text-sm leading-6">
              <label className="text-color-default" htmlFor={option.value}>
                {option.label}
                {option.description && (
                  <p className="text-neutral-500 dark:text-neutral-400">
                    {option.description}
                  </p>
                )}
              </label>
            </div>
          </div>
        ))}
      </RadioGroupRoot>
    </div>
  )
}

type RadioGroupRootPropsType = React.ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Root
>

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupRootPropsType
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})

const RadioGroupItemIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'focus-ring bg-default h-4 w-4 rounded-full border border-neutral-300 shadow-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 [&[data-state=checked]]:border-none [&[data-state=checked]]:bg-primary-600 [&[data-state=checked]]:hover:bg-primary-800',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-light" />
    </RadioGroupPrimitive.Item>
  )
})

export default RadioGroup
export { RadioGroupFormField, RadioGroupRoot, RadioGroupItemIndicator }
