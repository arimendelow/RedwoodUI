import { AnimatePresence, motion } from 'framer-motion'

import { Label, get, useFormContext } from '@redwoodjs/forms'

import { cn } from 'src/lib/uiUtils'

/**
 * Redefined from https://github.com/redwoodjs/redwood/blob/b6457700abf209da0c23bfa8dc0fc3883f663dc2/packages/forms/src/index.tsx#L627C1-L635C2
 */
const DEFAULT_MESSAGES = {
  required: 'is required',
  pattern: 'is not formatted correctly',
  minLength: 'is too short',
  maxLength: 'is too long',
  min: 'is too low',
  max: 'is too high',
  validate: 'is not valid',
}

interface IFieldErrorProps
  extends React.ComponentPropsWithoutRef<typeof motion.div> {
  /**
   * The name of the field the `<FieldError>`'s associated with.
   */
  name: string
}

/**
 * This is a redefinition of FieldError from
 * https://github.com/redwoodjs/redwood/blob/b6457700abf209da0c23bfa8dc0fc3883f663dc2/packages/forms/src/index.tsx#L671
 *
 * We redefine it so that we can use framer-motion's AnimatePresence to animate the error message.
 */
const FieldError = ({ name, ...rest }: IFieldErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const validationError = get(errors, name)

  const errorMessage =
    validationError &&
    (validationError.message ||
      `${name} ${
        DEFAULT_MESSAGES[validationError.type as keyof typeof DEFAULT_MESSAGES]
      }`)

  return (
    <AnimatePresence>
      {validationError && (
        <motion.div
          initial={{ opacity: 0, translateY: -5 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 0 }}
          {...rest}
        >
          {errorMessage}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface IDescriptionProps {
  name: string
  children: React.ReactNode
  /**
   * Classes that will be additionally applied if there are errors.
   * Note that this is a bit different from `errorClassName` in the RW components
   * because it's applied additionally, not instead of.
   */
  errorClassName?: string
  className?: string
}

/**
 * Renders a `<p>` that can be styled differently if errors are present.
 * Somewhat based on Label: https://github.com/redwoodjs/redwood/blob/b6457700abf209da0c23bfa8dc0fc3883f663dc2/packages/forms/src/index.tsx#L594
 */
const Description = ({
  name,
  children,
  errorClassName,
  className,
}: IDescriptionProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const validationError = get(errors, name)

  return (
    <p className={cn(className, validationError && errorClassName)}>
      {children}
    </p>
  )
}

export interface IInputFieldWrapperProps {
  children: React.ReactNode
  /** Identifier name for this field */
  name: string
  /** Visual name for this field */
  label?: string
  /** Description for this field */
  description?: string
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
  /**
   * Use this to include a custom component that will be placed inside the input, at the end.
   * This is given the `pointer-events-none` class, so it won't interfere with the input.
   * If you need to add a click handler, you'll need to add `pointer-events-auto` to the component.
   * (If you're using the `Button` component, it already has this class.)
   */
  endComponent?: React.ReactNode
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
  description,
  maxLength,
  currentLength,
  optional = false,
  endComponent,
  hideErrorMessage,
  className,
}: IInputFieldWrapperProps) => {
  return (
    <div className={cn('mb-3 w-full text-left', className)}>
      {label && (
        <Label
          name={name}
          className="text-color-secondary block text-sm font-medium"
          errorClassName="block text-sm font-medium text-color-secondary-error"
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
      {description && (
        <Description
          name={name}
          className="text-color-tertiary mb-3 mt-1 text-sm leading-5"
          errorClassName="text-color-tertiary-error"
        >
          {description}
        </Description>
      )}
      <div className={cn(!!label && 'mt-1', 'relative rounded-md')}>
        {children}
        <div className="pointer-events-none absolute bottom-0 right-2 flex h-full items-center">
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
        <AnimatePresence>
          <FieldError
            key="error"
            name={name}
            className="mt-1 text-sm text-red-700"
          />
        </AnimatePresence>
      )}
    </div>
  )
}

export default InputFieldWrapper
