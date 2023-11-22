/**
 * Using HeadlessUI's Listbox because the RadixUI one doesn't support multiple selection,
 * which is a crucial feature.
 * See here: https://github.com/radix-ui/primitives/issues/1270
 */
import { Listbox as SelectPrimitive } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'

import { useController } from '@redwoodjs/forms'

import {
  IDropdownOption,
  useGetDropdownDisplayValue,
} from 'src/components/formFields/dropdownFieldCommon'
import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import { cn } from 'src/lib/utils'

import { inputFieldVariants } from '../inputVariants'

interface ISelectSpecificProps<TValue extends React.ReactNode = string> {
  options: IDropdownOption<TValue>[]
  placeholder?: string
  buttonIcon?: JSX.Element
  initSelectedValueUncontrolled?: boolean
  selectedValue?: TValue | TValue[]
  setSelectedValue?: (value: TValue | TValue[]) => void
  /**
   * The callback that is fired when an option is selected.
   */
  onValueChange?: (value: TValue | TValue[]) => void
}

/**
 * `onChange` is omitted because it's handled by the `onValueChange` prop.
 */
type SelectPropsType<TValue extends React.ReactNode = string> = Omit<
  SelectRootPropsType,
  'onChange'
> &
  /**
   * We remove endComponent as it's always the ComboboxButton. The icon used in the button
   * is controlled by the buttonIcon prop.
   */
  Omit<IInputFieldWrapperProps, 'children' | 'endComponent'> &
  ISelectSpecificProps<TValue> & {
    wrapperClassName?: string
  }

function Select<TValue extends React.ReactNode = string>({
  /** START props for select */
  options,
  placeholder,
  buttonIcon = (
    <ChevronUpDownIcon
      className="bg-default h-5 w-5 text-neutral-400"
      aria-hidden="true"
    />
  ),
  initSelectedValueUncontrolled,
  selectedValue: selectedValueControlled,
  onValueChange: onValueChangeControlled,
  /** END props for select */
  /** START for wrapper */
  name,
  label,
  maxLength,
  currentLength,
  optional,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  ...props
}: SelectPropsType<TValue>) {
  const [selectedValueUncontrolled, setSelectedValueUncontrolled] =
    React.useState<TValue | null | TValue[]>(
      initSelectedValueUncontrolled || props.multiple ? [] : null
    )
  const selectedValue = selectedValueControlled ?? selectedValueUncontrolled
  const onValueChange = onValueChangeControlled ?? setSelectedValueUncontrolled

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    defaultValue: selectedValue,
    rules: { required: !optional },
  })
  const { onChange: rhfOnChange, onBlur, ref } = field

  const getDisplayValue = useGetDropdownDisplayValue(options)

  return (
    <SelectRoot
      name={name}
      onChange={(value) => {
        onValueChange(value as TValue)
        rhfOnChange(value)
      }}
      value={selectedValue}
      {...props}
    >
      {({ open }) => {
        return (
          <>
            <SelectButton
              placeholder={placeholder}
              displayText={selectedValue ? getDisplayValue(selectedValue) : ''}
              ref={ref}
              onBlur={onBlur}
              colorTreatment={fieldError ? 'error' : 'default'}
              name={name}
              label={label}
              maxLength={maxLength}
              currentLength={currentLength}
              optional={optional}
              hideErrorMessage={hideErrorMessage}
              className={wrapperClassName}
              disabled={props.disabled}
              endComponent={buttonIcon}
            />
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{
                    opacity: 0,
                    transform: 'scale(0.9)',
                  }}
                  animate={{
                    opacity: 1,
                    transform: 'scale(1)',
                    transition: { duration: 0 },
                  }}
                  exit={{
                    opacity: 0,
                    transform: 'scale(0.9)',
                  }}
                  transition={{ ease: 'easeInOut', duration: 0.1 }}
                >
                  <SelectOptions static>
                    {options.map(({ value, renderOption, disabled }, index) => (
                      <SelectOption
                        key={index}
                        value={value}
                        disabled={disabled}
                      >
                        {(props) => renderOption({ ...props, value })}
                      </SelectOption>
                    ))}
                  </SelectOptions>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      }}
    </SelectRoot>
  )
}

type SelectRootPropsType = React.ComponentPropsWithRef<typeof SelectPrimitive>
/**
 * The main Select component.
 */
const SelectRoot = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive>,
  React.PropsWithoutRef<SelectRootPropsType>
>(({ ...props }, ref) => <SelectPrimitive ref={ref} {...props} />)

type SelectButtonPropsType = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Button
> &
  Omit<IInputFieldWrapperProps, 'children'> &
  VariantProps<typeof inputFieldVariants> & {
    displayText?: string
    placeholder?: string
    disabled?: boolean
  }
/**
 * The Select's button. We style it to look like a regular input.
 */
const SelectButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Button>,
  React.PropsWithoutRef<SelectButtonPropsType>
>(
  (
    {
      displayText,
      placeholder,
      colorTreatment,
      inputTextSize,
      className,
      disabled,
      /** START for wrapper */
      name,
      label,
      maxLength,
      currentLength,
      optional,
      hideErrorMessage,
      endComponent,
      /** END for wrapper */
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Button ref={ref} className="w-full" {...props}>
      <InputFieldWrapper
        name={name}
        label={label}
        maxLength={maxLength}
        currentLength={currentLength}
        optional={optional}
        hideErrorMessage={hideErrorMessage}
        className={className}
        endComponent={endComponent}
      >
        <input
          readOnly
          placeholder={placeholder}
          className={inputFieldVariants({
            colorTreatment,
            inputTextSize,
            className: cn('cursor-pointer select-none', className),
          })}
          value={displayText}
          disabled={disabled}
        />
      </InputFieldWrapper>
    </SelectPrimitive.Button>
  )
)

type SelectLabelPropsType = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Label
>
/**
 * A label that can be used for more control over the text your Select will announce to screenreaders.
 * Its `id` attribute will be automatically generated and linked to the root `SelectRoot`
 * component via the `aria-labelledby` attribute.
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.PropsWithoutRef<SelectLabelPropsType>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={className} {...props} />
))

type SelectOptionsPropsType = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Options
>
/**
 * The component that directly wraps the list of options in your custom Select.
 */
const SelectOptions = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Options>,
  React.PropsWithoutRef<SelectOptionsPropsType>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Options
    ref={ref}
    className={cn('dropdown-content-field', className)}
    {...props}
  />
))

type SelectOptionPropsType = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Option
>
/**
 * Used to wrap each item within your Select.
 */
const SelectOption = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Option>,
  React.PropsWithoutRef<SelectOptionPropsType>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Option ref={ref} className={className} {...props} />
))

export default Select
export { SelectRoot, SelectButton, SelectLabel, SelectOptions, SelectOption }
