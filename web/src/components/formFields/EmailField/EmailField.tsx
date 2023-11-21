import { EmailField as RWEmailField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'

interface IEmailFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWEmailField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropType {
  wrapperClassName?: string
}

const EmailField = React.forwardRef<HTMLInputElement, IEmailFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      maxLength,
      currentLength,
      optional,
      endComponent,
      hideErrorMessage,
      wrapperClassName,
      /** END for wrapper */
      inputTextSize,
      className,
      validation,
      ...props
    },
    ref
  ) => {
    /**
     * Combine the default email pattern validation with any custom validation.
     * Note that this email pattern is very basic, and just checks for the presence of an @ symbol.
     */
    const combinedValidation = React.useMemo(
      () => ({ pattern: /^\S+@\S+$/i, ...validation }),
      [validation]
    )
    return (
      <InputFieldWrapper
        name={name}
        label={label}
        maxLength={maxLength}
        currentLength={currentLength}
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <RWEmailField
          ref={ref}
          name={name}
          className={inputFieldVariants({ inputTextSize, className })}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          // Automatically add the required validation if the field is not marked as optional
          validation={
            optional
              ? combinedValidation
              : { ...combinedValidation, required: true }
          }
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default EmailField
