import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { useController } from '@redwoodjs/forms'

import { GroupFieldOptionLabel } from 'src/ui/formFields/groupFieldCommon'
import { IInputFieldWrapperProps } from 'ui/formFields/InputFieldWrapper'
import InputFieldWrapper from 'ui/formFields/InputFieldWrapper'
import { cn } from 'src/lib/uiUtils'

interface IRadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface IRadioGroupProps
  extends Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength' | 'endComponent'
    >,
    // Omit the name prop from IRadioGroupRootProps because we want the one from IInputFieldWrapperProps
    Omit<IRadioGroupRootProps, 'name' | 'asChild'> {
  options: IRadioGroupOption[]
  wrapperClassName?: string
}

const RadioGroupField = ({
  /** START for wrapper */
  name,
  label,
  description,
  optional,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  options,
  ...props
}: IRadioGroupProps) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    defaultValue: props.defaultValue,
    rules: { required: !optional },
  })
  return (
    <InputFieldWrapper
      name={name}
      label={label}
      description={description}
      optional={optional}
      hideErrorMessage={hideErrorMessage}
      className={wrapperClassName}
    >
      <RadioGroupRoot onValueChange={field.onChange} {...field} {...props}>
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
            <GroupFieldOptionLabel
              optionValue={option.value}
              optionLabel={option.label}
              optionDescription={option.description}
              hasError={!!fieldError}
            />
          </div>
        ))}
      </RadioGroupRoot>
    </InputFieldWrapper>
  )
}

interface IRadioGroupRootProps
  extends React.ComponentPropsWithRef<typeof RadioGroupPrimitive.Root> {}

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  IRadioGroupRootProps
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
        'focus-ring bg-default h-4 w-4 flex-shrink-0 rounded-full border border-neutral-300 shadow-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700 [&[data-state=checked]]:border-none [&[data-state=checked]]:bg-primary-600 [&[data-state=checked]]:hover:bg-primary-800',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-light" />
    </RadioGroupPrimitive.Item>
  )
})

export default RadioGroupField
export { RadioGroupRoot, RadioGroupItemIndicator }
