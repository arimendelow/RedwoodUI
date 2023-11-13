/**
 * Using HeadlessUI's Combobox because it doesn't yet exist for RadixUI
 * Track progress on RadixUI combobox here: https://github.com/radix-ui/primitives/issues/1342
 */
import { Combobox as ComboboxPrimitive } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'

import { useController } from '@redwoodjs/forms'

import {
  IDropdownOption,
  useGetDropdownDisplayValue,
} from 'src/components/forms/dropdownFieldCommon'
import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/forms/InputFieldWrapper/InputFieldWrapper'
import { inputFieldVariants } from 'src/components/forms/inputVariants'
import { cn } from 'src/lib/utils'

interface IComboboxSpecificProps<TValue extends React.ReactNode = string> {
  options: IDropdownOption<TValue>[]
  placeholder?: string
  buttonIcon?: JSX.Element
  initSelectedValueUncontrolled?: TValue
  selectedValue?: TValue | TValue[]
  setSelectedValue?: (value: TValue | TValue[]) => void
  /**
   * The callback that is fired when the input changes.
   * This should be used to filter the options parameter.
   */
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The callback that is fired when an option is selected.
   */
  onValueChange?: (value: TValue | TValue[]) => void
}

/**
 * (onChange is omitted because it's handled by the onValueChange prop)
 */
type ComboboxPropsType<TValue extends React.ReactNode = string> = Omit<
  ComboboxRootPropsType,
  'onChange'
> &
  /**
   * We remove endComponent as it's always the ComboboxButton. The icon used in the button
   * is controlled by the buttonIcon prop.
   */
  Omit<IInputFieldWrapperProps, 'children' | 'className' | 'endComponent'> &
  IComboboxSpecificProps<TValue> & {
    wrapperClassName?: string
  }

/**
 * An easily used Combobox component that assembles all the pieces together for you to
 * create a combobox that fits nicely into a form.
 * As such, it must be used within a FormProvider (or directly as a child to a Form component).
 *
 * If you instead prefer to assemble the pieces yourself, you can use the `ComboboxRoot`,
 * `ComboboxButton`, `ComboboxInput`, `ComboboxOptions`, and `ComboboxOption` components directly.
 * Use this component as an example of how to use those components.
 */
function Combobox<TValue extends React.ReactNode = string>({
  /** START props for combobox */
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
  onInputChange: onInputChangeControlled,
  onValueChange: onValueChangeControlled,
  /** END props for combobox */
  /** START for wrapper */
  name,
  label,
  maxLength,
  currentLength,
  optional,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  multiple,
  ...props
}: ComboboxPropsType<TValue>) {
  const [selectedValueUncontrolled, setSelectedValueUncontrolled] =
    React.useState<TValue | null | TValue[]>(
      initSelectedValueUncontrolled || multiple ? [] : null
    )
  const [queryUncontrolled, setQueryUncontrolled] = React.useState('')
  const onInputChangeUncontrolled = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryUncontrolled(event.target.value)
  }

  const filteredOptionsUncontrolled =
    queryUncontrolled === ''
      ? options
      : options.filter((option) => {
          return (option.value as string)
            .toLowerCase()
            .includes(queryUncontrolled.toLowerCase())
        })

  const selectedValue = selectedValueControlled ?? selectedValueUncontrolled
  const onValueChange = onValueChangeControlled ?? setSelectedValueUncontrolled

  const onInputChange = onInputChangeControlled ?? onInputChangeUncontrolled

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    defaultValue: selectedValue,
    rules: { required: !props.nullable },
  })
  const { onChange: rhfOnChange, onBlur, ref } = field

  const getDisplayValue = useGetDropdownDisplayValue(options)

  return (
    <ComboboxRoot
      name={name}
      onChange={(value) => {
        onValueChange(value as TValue)
        rhfOnChange(value)
      }}
      value={selectedValue}
      {...props}
      multiple={multiple}
    >
      {({ open }) => {
        if (!open) {
          /**
           * Reset the query when the combobox closes.
           * What happens otherwise is that the query is still set when the combobox opens again,
           * and the options are filtered by that query, even though the input appears empty.
           */
          onInputChange({
            target: {
              value: '',
            },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        return (
          <>
            <InputFieldWrapper
              name={name}
              label={label}
              maxLength={maxLength}
              currentLength={currentLength}
              optional={optional}
              hideErrorMessage={hideErrorMessage}
              className={wrapperClassName}
              endComponent={<ComboboxButton icon={buttonIcon} />}
            >
              <ComboboxInput
                displayValue={selectedValue ? getDisplayValue : undefined}
                placeholder={placeholder}
                ref={ref}
                onBlur={onBlur}
                onChange={onInputChange}
                colorTreatment={fieldError ? 'error' : 'default'}
              />
            </InputFieldWrapper>
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
                  <ComboboxOptions static>
                    {(onInputChangeControlled
                      ? options
                      : filteredOptionsUncontrolled
                    ).map(({ value, renderOption, disabled }, index) => (
                      <ComboboxOption
                        key={index}
                        value={value}
                        disabled={disabled}
                      >
                        {(props) => renderOption({ ...props, value })}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )
      }}
    </ComboboxRoot>
  )
}

/**
 * there's some weird type-trickery with props,
 * so it thinks multiple is either `false` or `undefined` (because sometimes that is the case),
 * but it's actually `boolean` or `undefined`.
 *
 * Therefore, we redefine the `multiple` prop.
 */
type ComboboxRootPropsType = Omit<
  React.ComponentPropsWithRef<typeof ComboboxPrimitive>,
  'multiple'
> & {
  multiple?: boolean
}
/**
 * The main Combobox component.
 */
const ComboboxRoot = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive>,
  React.PropsWithoutRef<ComboboxRootPropsType>
>(({ multiple, ...props }, ref) => (
  <ComboboxPrimitive
    ref={ref}
    // @ts-expect-error (see comment on ComboboxRootPropsType)
    multiple={multiple}
    {...props}
  />
))

type ComboboxInputPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Input
> &
  VariantProps<typeof inputFieldVariants> & {
    /**
     * This isn't explicitly typed in the HeadlessUI props, but it is supported.
     * See: https://github.com/tailwindlabs/headlessui/issues/2407
     */
    placeholder?: string
  }
/**
 * The Combobox's input.
 */
const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.PropsWithoutRef<ComboboxInputPropsType>
>(({ colorTreatment, inputTextSize, className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    ref={ref}
    className={inputFieldVariants({
      colorTreatment,
      inputTextSize,
      className,
    })}
    {...props}
  />
))

type ComboboxButtonPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Button
> & {
  icon: React.ReactNode
}
/**
 * The Combobox's button.
 */
const ComboboxButton = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Button>,
  React.PropsWithoutRef<ComboboxButtonPropsType>
>(({ icon, className, ...props }, ref) => (
  <ComboboxPrimitive.Button ref={ref} className={className} {...props}>
    {icon}
  </ComboboxPrimitive.Button>
))

type ComboboxLabelPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Label
>
/**
 * A label that can be used for more control over the text your Combobox will announce to screenreaders.
 * Its `id` attribute will be automatically generated and linked to the root `ComboboxRoot`
 * component via the `aria-labelledby` attribute.
 */
const ComboboxLabel = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Label>,
  React.PropsWithoutRef<ComboboxLabelPropsType>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Label ref={ref} className={className} {...props} />
))

type ComboboxOptionsPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Options
>
/**
 * The component that directly wraps the list of options in your custom Combobox.
 */
const ComboboxOptions = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Options>,
  React.PropsWithoutRef<ComboboxOptionsPropsType>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Options
    ref={ref}
    className={cn('dropdown-content-field', className)}
    {...props}
  />
))

type ComboboxOptionPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Option
>
/**
 * Used to wrap each item within your Combobox.
 */
const ComboboxOption = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Option>,
  React.PropsWithoutRef<ComboboxOptionPropsType>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Option ref={ref} className={className} {...props} />
))

export default Combobox
export {
  ComboboxRoot,
  ComboboxInput,
  ComboboxButton,
  ComboboxLabel,
  ComboboxOptions,
  ComboboxOption,
}
