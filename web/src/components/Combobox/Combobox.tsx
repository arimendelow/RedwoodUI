/**
 * Using HeadlessUI's combobox because it doesn't yet exist for RadixUI
 * Track progress on RadixUI combobox here: https://github.com/radix-ui/primitives/issues/1342
 */
import { Combobox as ComboboxPrimitive } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

import { useController } from '@redwoodjs/forms'

import InputFieldWrapper, {
  InputFieldWrapperProps,
} from 'src/components/forms/InputFieldWrapper/InputFieldWrapper'
import { cn } from 'src/lib/utils'

const SimpleOptionRendererWithCheckmark: RenderOptionType<string> = ({
  active,
  selected,
  disabled,
  value,
}) => (
  <div
    className={cn(
      'relative select-none py-2 pl-3 pr-9',
      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
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
          active ? 'text-white' : 'text-indigo-600'
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
  /** Omit endComponent as we're putting the ComboboxButton there */
  Omit<InputFieldWrapperProps, 'endComponent' | 'children'> & {
    options: IComboboxOption<TValue>[]
    initSelectedValue?: TValue
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

function Combobox<TValue extends React.ReactNode = string>({
  /** START props for combobox */
  options,
  initSelectedValue,
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
    React.useState(initSelectedValue || options[0].value)
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

  const { field } = useController({ name, defaultValue: selectedValue })
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
      <InputFieldWrapper
        name={name}
        label={label}
        maxLength={maxLength}
        currentLength={currentLength}
        inline={inline}
        optional={optional}
        endComponent={<ComboboxButton />}
      >
        <>
          <ComboboxInput ref={ref} onBlur={onBlur} onChange={onInputChange} />
          <ComboboxOptions>
            {(onInputChangeControlled
              ? options
              : filteredOptionsUncontrolled
            ).map(({ value, renderOption, disabled }, index) => (
              <ComboboxOption key={index} value={value} disabled={disabled}>
                {(props) => renderOption({ ...props, value })}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </>
      </InputFieldWrapper>
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
>
/**
 * The Combobox's input.
 */
const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.PropsWithoutRef<ComboboxInputPropsType>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    ref={ref}
    className={cn('input-field', className)}
    {...props}
  />
))

type ComboboxButtonPropsType = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Button
>
/**
 * The Combobox's button.
 */
const ComboboxButton = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Button>,
  React.PropsWithoutRef<ComboboxButtonPropsType>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Button
    ref={ref}
    className={cn(
      'absolute inset-y-0 right-0 flex items-center pr-2',
      className
    )}
    {...props}
  >
    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
      'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
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
