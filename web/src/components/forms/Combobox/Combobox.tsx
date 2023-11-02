/**
 * Using HeadlessUI's combobox because it doesn't yet exist for RadixUI
 * Track progress on RadixUI combobox here: https://github.com/radix-ui/primitives/issues/1342
 */
import { Combobox as ComboboxPrimitive } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import { VariantProps } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'

import { useController } from '@redwoodjs/forms'

import InputFieldWrapper, {
  InputFieldWrapperProps,
} from 'src/components/forms/InputFieldWrapper/InputFieldWrapper'
import { inputFieldVariants } from 'src/components/forms/inputVariants'
import { cn } from 'src/lib/utils'

const SimpleOptionRendererWithCheckmark: RenderOptionType<string> = ({
  active,
  selected,
  disabled,
  value,
}) => (
  <div
    className={cn(
      'text-color-default relative select-none py-2 pl-3 pr-9',
      active && 'text-color-default-invert bg-primary-600',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    )}
  >
    <span className={cn('block truncate', selected && 'font-semibold')}>
      {value}
    </span>
    {selected && (
      <span
        className={cn(
          'absolute inset-y-0 right-0 flex items-center pr-4',
          active ? 'text-color-default-invert' : 'text-primary-600'
        )}
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    )}
  </div>
)

/**
 * This is redefined as it's not exported by HeadlessUI, but you can find it in
 * https://github.com/tailwindlabs/headlessui/blob/1469b85c36802265c2409f443f926e1bb02230d4/packages/%40headlessui-react/src/components/combobox/combobox.tsx#L1652
 */
interface OptionRenderPropArg {
  active: boolean
  selected: boolean
  disabled: boolean
}

type RenderOptionType<TValue extends React.ReactNode = string> = (
  props: OptionRenderPropArg & { value: TValue }
) => JSX.Element

interface IComboboxOption<TValue extends React.ReactNode = string> {
  value: TValue
  renderOption: RenderOptionType<TValue>
  disabled?: boolean
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
  Omit<InputFieldWrapperProps, 'endComponent' | 'children'> & {
    options: IComboboxOption<TValue>[]
    placeholder?: string
    buttonIcon?: React.ReactNode
    initSelectedValueUncontrolled?: TValue
    selectedValue?: TValue
    setSelectedValue?: (value: TValue) => void
    /**
     * The callback that is fired when the input changes.
     * This should be used to filter the options parameter.
     */
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    /**
     * The callback that is fired when an option is selected.
     */
    onValueChange?: (value: TValue) => void
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
      className="h-5 w-5 text-neutral-400"
      aria-hidden="true"
    />
  ),
  initSelectedValueUncontrolled,
  selectedValue: selectedValueControlled,
  onInputChange: onInputChangeControlled,
  onValueChange: onValueChangeControlled,
  /** END props for combobox */
  /** START props for field wrapper */
  name,
  label,
  maxLength,
  currentLength,
  inline,
  optional,
  /** END props for field wrapper */
  ...props
}: ComboboxPropsType<TValue>) {
  const [selectedValueUncontrolled, setSelectedValueUncontrolled] =
    React.useState<TValue | null>(initSelectedValueUncontrolled || null)
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

  return (
    <ComboboxRoot
      name={name}
      onChange={(value) => {
        onValueChange(value as TValue)
        rhfOnChange(value)
      }}
      value={selectedValue}
      {...props}
    >
      {({ open }) => (
        <InputFieldWrapper
          name={name}
          label={label}
          maxLength={maxLength}
          currentLength={currentLength}
          inline={inline}
          optional={optional}
          endComponent={<ComboboxButton icon={buttonIcon} />}
        >
          <>
            <ComboboxInput
              placeholder={placeholder}
              ref={ref}
              onBlur={onBlur}
              onChange={onInputChange}
              colorTreatment={fieldError ? 'error' : 'default'}
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
        </InputFieldWrapper>
      )}
    </ComboboxRoot>
  )
}

type ComboboxRootPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive
>
/**
 * The main Combobox component.
 */
const ComboboxRoot = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive>,
  React.PropsWithoutRef<ComboboxRootPropsType>
>(({ ...props }, ref) => <ComboboxPrimitive ref={ref} as="div" {...props} />)

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
  <ComboboxPrimitive.Button
    ref={ref}
    className={cn(
      'absolute inset-y-0 right-0 flex items-center pr-2',
      className
    )}
    {...props}
  >
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
    className={cn(
      'bg-default absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-default py-1 text-base ring-1 ring-neutral-300 focus:outline-none sm:text-sm',
      className
    )}
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

export { SimpleOptionRendererWithCheckmark }
