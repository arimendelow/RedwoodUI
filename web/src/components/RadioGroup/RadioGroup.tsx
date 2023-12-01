import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { useController } from '@redwoodjs/forms'

import { IInputFieldWrapperProps } from 'src/components/formFields/InputFieldWrapper'
import { cn } from 'src/lib/utils'

import InputFieldWrapper from '../formFields/InputFieldWrapper/InputFieldWrapper'

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
    // Omit the name prop from RadioGroupRootPropsType because we want the one from IInputFieldWrapperProps
    Omit<RadioGroupRootPropsType, 'name'> {
  options: IRadioGroupOption[]
  wrapperClassName?: string
}

const RadioGroup = ({
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
      <RadioGroupRoot className="flex flex-col gap-2" {...props} {...field}>
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
              <label
                className={cn(
                  fieldError ? 'text-color-error' : 'text-color-default'
                )}
                htmlFor={option.value}
              >
                {option.label}
                {option.description && (
                  <p
                    className={cn(
                      fieldError
                        ? 'text-color-secondary-error'
                        : 'text-color-secondary'
                    )}
                  >
                    {option.description}
                  </p>
                )}
              </label>
            </div>
          </div>
        ))}
      </RadioGroupRoot>
    </InputFieldWrapper>
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
export { RadioGroupRoot, RadioGroupItemIndicator }
