import { PasswordField as RWPasswordField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropsType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'

interface IPasswordFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWPasswordField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropsType {
  wrapperClassName?: string
}

const PasswordField = React.forwardRef<HTMLInputElement, IPasswordFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      description,
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
      placeholder = '••••••••',
      ...props
    },
    ref
  ) => {
    return (
      <InputFieldWrapper
        name={name}
        label={label}
        description={description}
        maxLength={maxLength}
        currentLength={currentLength}
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <RWPasswordField
          ref={ref}
          name={name}
          placeholder={placeholder}
          className={inputFieldVariants({ inputTextSize, className })}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          validation={optional ? validation : { ...validation, required: true }}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default PasswordField
