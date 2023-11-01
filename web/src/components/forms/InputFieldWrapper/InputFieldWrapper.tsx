import { useAutoAnimate } from '@formkit/auto-animate/react'
import { VariantProps } from 'class-variance-authority'

import {
  FieldError,
  InputFieldProps as RWInputFieldProps,
  Label,
} from '@redwoodjs/forms'

import { inputFieldVariants } from 'src/components/forms/inputVariants'
import { cn } from 'src/lib/utils'

/** Use this to type any props that are children of `InputFieldWrapper` */
export interface InputFieldProps
  extends Omit<InputFieldWrapperProps, 'children'>,
    /**
     * This is omitted because we have our own 'size' variant.
     * If you mean to use this directly, we instead map it to 'htmlInputElementSize'.
     */
    Omit<RWInputFieldProps, 'size'>,
    /**
     * We omit the `colorTreatment` variant because it's meant for internal use,
     * as it's used to apply the error color treatment, which the field handles automatically.
     */
    Omit<VariantProps<typeof inputFieldVariants>, 'colorTreatment'> {
  defaultValue?: string | number | readonly string[]
  placeholder?: string
  disabled?: boolean
  /**
   * Where the 'size' prop corresponds to the Input's size variants, this prop
   * corresponds to the HTMLInputElement's size attribute.
   * See here for usage: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
   */
  htmlInputElementSize?: number
}

export interface InputFieldWrapperProps {
  children: JSX.Element
  /** Identifier name for this field */
  name: string
  /** Visual name for this field */
  label?: string
  /** Maximum length of the text in the field */
  maxLength?: number
  /**
   * Current length of the text in the field. Must include if using maxLength.
   * - You can do this as follows: `currentLength={useWatch({ name: <field name> })?.length || 0}`
   * - The reason this isn't calculated inside the component is that it would cause unnecessary hook usage when not needed.
   */
  currentLength?: number
  /** Use this to make the field inline */
  inline?: boolean
  /** Use this to mark that the field is optional */
  optional?: boolean
  /** Use this to include a custom component that will be placed inside the input, at the end */
  endComponent?: JSX.Element
}
const InputFieldWrapper = ({
  children,
  name,
  label,
  maxLength,
  currentLength,
  inline = false,
  optional = false,
  endComponent,
}: InputFieldWrapperProps) => {
  // This is used to animate, for example, the appearance of error messages
  const [animationParentRef] = useAutoAnimate()
  return (
    <div
      ref={animationParentRef}
      className={cn('w-full text-left', inline ? 'mr-10 flex-1' : 'mb-3')}
    >
      {label && (
        <Label
          name={name}
          className="block text-sm font-medium text-neutral-700 dark:text-light"
          errorClassName="block text-sm font-medium text-red-700"
        >
          {label}
          {optional && (
            <span className="text-xs uppercase text-neutral-400">
              {' '}
              - optional
            </span>
          )}
        </Label>
      )}
      <div className={cn(!!label && 'mt-1', 'relative rounded-default')}>
        {children}
        <div className="absolute bottom-0 right-2 flex h-full items-center">
          {endComponent}
        </div>
        {maxLength !== undefined && currentLength !== undefined && (
          <div
            className={cn(
              'pointer-events-none absolute -inset-y-0 -right-4 flex w-2 items-center text-left text-sm text-neutral-400',
              maxLength - currentLength < 0 && 'text-red-700'
            )}
          >
            {maxLength - currentLength}
          </div>
        )}
      </div>
      {!inline && (
        <FieldError name={name} className="mt-2 text-sm text-red-700" />
      )}
    </div>
  )
}

export default InputFieldWrapper
