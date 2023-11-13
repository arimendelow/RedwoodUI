import { useAutoAnimate } from '@formkit/auto-animate/react'

import { FieldError, Label } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

export interface IInputFieldWrapperProps {
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
  /** Use this to mark that the field is optional */
  optional?: boolean
  /** Use this to include a custom component that will be placed inside the input, at the end */
  endComponent?: JSX.Element
  /**
   * Use this to hide the error message that appears below the input
   */
  hideErrorMessage?: boolean
  /**
   * Use this to add a custom class name to the wrapper div
   */
  className?: string
}
const InputFieldWrapper = ({
  children,
  name,
  label,
  maxLength,
  currentLength,
  optional = false,
  endComponent,
  hideErrorMessage,
  className,
}: IInputFieldWrapperProps) => {
  // This is used to animate, for example, the appearance of error messages
  const [animationParentRef] = useAutoAnimate()
  return (
    <div
      ref={animationParentRef}
      className={cn('mb-3 w-full text-left', className)}
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
      {!hideErrorMessage && (
        <FieldError name={name} className="mt-2 text-sm text-red-700" />
      )}
    </div>
  )
}

export default InputFieldWrapper
