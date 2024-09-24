import { useController } from '@redwoodjs/forms'

import Checkbox from 'ui/Checkbox'
import { GroupFieldOptionLabel } from 'src/ui/formFields/groupFieldCommon'
import InputFieldWrapper from 'ui/formFields/InputFieldWrapper'
import { IInputFieldWrapperProps } from 'ui/formFields/InputFieldWrapper'
import Switch from 'ui/Switch'
import { cn } from 'src/lib/uiUtils'

interface ICheckboxGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface ICheckboxGroupProps
  extends Omit<
    IInputFieldWrapperProps,
    'children' | 'className' | 'maxLength' | 'currentLength' | 'endComponent'
  > {
  options: ICheckboxGroupOption[]
  /**
   * The default value of the checkbox group, as an array of strings, where each string is the value of the checkbox you want to set.
   */
  defaultValue?: string[]
  /**
   * The indicator to use for the checkbox.
   * - `checkbox` is the default
   */
  indicator?: 'checkbox' | 'switch'
  wrapperClassName?: string
}

const CheckboxGroupField = ({
  /** START for wrapper */
  name,
  label,
  description,
  optional,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  options,
  defaultValue = [],
  indicator = 'checkbox',
}: ICheckboxGroupProps) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    defaultValue,
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
      {/* This div is intended to give parity with the radio group - see the generated div of `RadioGroupRoot` */}
      <div id="checkboxgroup" aria-required="false" className="grid gap-2">
        {options.map((option) => {
          const checked = field.value.includes(option.value)
          const onCheckedChange = (checked: boolean) => {
            return checked
              ? field.onChange([...field.value, option.value])
              : field.onChange(
                  field.value?.filter((value: string) => value !== option.value)
                )
          }
          return (
            <div
              key={option.value}
              className={cn(
                'flex items-start',
                option.disabled && 'disabled-classes'
              )}
            >
              {indicator === 'checkbox' ? (
                <Checkbox
                  id={option.value}
                  value={option.value}
                  checked={checked}
                  // See the Checkbox component for why we need to use setChecked instead of onCheckedChange
                  setChecked={onCheckedChange}
                  disabled={option.disabled}
                  className="mt-0.5"
                />
              ) : (
                <Switch
                  id={option.value}
                  value={option.value}
                  checked={checked}
                  onCheckedChange={onCheckedChange}
                  disabled={option.disabled}
                />
              )}
              <GroupFieldOptionLabel
                optionValue={option.value}
                optionLabel={option.label}
                optionDescription={option.description}
                hasError={!!fieldError}
              />
            </div>
          )
        })}
      </div>
    </InputFieldWrapper>
  )
}

export default CheckboxGroupField
