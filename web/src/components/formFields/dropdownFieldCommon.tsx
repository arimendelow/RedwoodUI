import { CheckIcon } from '@heroicons/react/24/outline'

import { cn } from 'src/lib/utils'

const SimpleOptionRendererWithRightCheckmark: RenderOptionType<string> = ({
  active,
  selected,
  disabled,
  value,
}) => (
  <div
    className={cn(
      'text-color-primary relative m-1 select-none py-2 pl-2 pr-8',
      active &&
        'text-color-primary-invert dark:text-color-primary rounded-default bg-primary-600',
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
          active
            ? 'text-color-primary-invert dark:text-color-primary'
            : 'text-primary-600'
        )}
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    )}
  </div>
)

const SimpleOptionRendererWithLeftCheckmark: RenderOptionType<string> = ({
  active,
  selected,
  disabled,
  value,
}) => (
  <div
    className={cn(
      'text-color-primary relative m-1 select-none py-2 pl-2 pr-8',
      active &&
        'text-color-primary-invert dark:text-color-primary rounded-default bg-primary-600',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    )}
  >
    {selected && (
      <span
        className={cn(
          'absolute inset-y-0 left-0 flex items-center pl-2',
          active
            ? 'text-color-primary-invert dark:text-color-primary'
            : 'text-primary-600'
        )}
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </span>
    )}
    <span className={cn('block truncate pl-6', selected && 'font-semibold')}>
      {value}
    </span>
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

interface IDropdownOption<TValue extends React.ReactNode = string> {
  value: TValue
  renderOption: RenderOptionType<TValue>
  /**
   * What to display in the input when this option is selected.
   * If this is omitted, the value will be cast to a string and used as the display value.
   */
  displayValue?: string
  disabled?: boolean
}

function useGetDropdownDisplayValue<TValue extends React.ReactNode = string>(
  options: IDropdownOption<TValue>[]
) {
  const getDisplayValue = React.useCallback(
    (item: TValue | TValue[]) => {
      // If `multiple` is true, then `item` will be an array.
      if (Array.isArray(item)) {
        return item
          .map((value) => {
            const option = options.find((option) => option.value === value)
            return option?.displayValue ?? String(value)
          })
          .join(', ')
      } else {
        const option = options.find((option) => option.value === item)
        return option?.displayValue ?? String(item)
      }
    },
    [options]
  )
  return getDisplayValue
}

export {
  SimpleOptionRendererWithRightCheckmark,
  SimpleOptionRendererWithLeftCheckmark,
  OptionRenderPropArg,
  RenderOptionType,
  IDropdownOption,
  useGetDropdownDisplayValue,
}
