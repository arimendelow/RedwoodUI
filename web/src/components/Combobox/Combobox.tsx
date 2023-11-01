/**
 * Using HeadlessUI's combobox because it doesn't yet exist for RadixUI
 * Track progress on RadixUI combobox here: https://github.com/radix-ui/primitives/issues/1342
 */
import { Combobox as ComboboxPrimitive } from '@headlessui/react'

/**
 * This is redefined as it's not exported by HeadlessUI, but you can find it in
 * https://github.com/tailwindlabs/headlessui/blob/1469b85c36802265c2409f443f926e1bb02230d4/packages/%40headlessui-react/src/components/combobox/combobox.tsx#L1652
 */
interface OptionRenderPropArg {
  active: boolean
  selected: boolean
  disabled: boolean
}

interface IComboboxOption<TValue> {
  value: TValue
  renderOption: (props: OptionRenderPropArg & { value: TValue }) => JSX.Element
}

type ComboboxPropsType<TValue> = Omit<ComboboxRootPropsType, 'onChange'> & {
  /**
   * The callback that is fired when the input changes.
   * This should be used to filter the options.
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * The callback that is fired when an option is selected.
   */
  onValueChange: (value: TValue) => void
  options: IComboboxOption<TValue>[]
}
const Combobox = <TValue,>({
  onInputChange,
  onValueChange,
  options,
  ...props
}: ComboboxPropsType<TValue>) => {
  return (
    <ComboboxRoot onChange={onValueChange} {...props}>
      <ComboboxInput onChange={onInputChange} />
      <ComboboxButton />
      <ComboboxOptions>
        {options.map(({ value, renderOption }, index) => (
          <ComboboxOption key={index} value={value}>
            {(props) => renderOption({ ...props, value })}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
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
>(({ ...props }, ref) => <ComboboxPrimitive ref={ref} {...props} />)

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
  <ComboboxPrimitive.Input ref={ref} className={className} {...props} />
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
  <ComboboxPrimitive.Button ref={ref} className={className} {...props} />
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
  <ComboboxPrimitive.Options ref={ref} className={className} {...props} />
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
