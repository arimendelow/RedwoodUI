import { TextField as RWTextField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/forms/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropType,
  inputFieldVariants,
} from 'src/components/forms/inputVariants'

interface ITextFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWTextField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropType {
  wrapperClassName?: string
}

const TextField = React.forwardRef<HTMLInputElement, ITextFieldProps>(
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
        <RWTextField
          ref={ref}
          name={name}
          className={inputFieldVariants({ inputTextSize, className })}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          // Automatically add the required validation if the field is not marked as optional
          validation={optional ? validation : { ...validation, required: true }}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default TextField
