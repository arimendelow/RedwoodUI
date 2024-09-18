import { TextField as RWTextField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/ui/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropsType,
  inputFieldVariants,
} from 'src/ui/formFields/inputVariants'

interface ITextFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWTextField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropsType {
  wrapperClassName?: string
}

const TextField = React.forwardRef<HTMLInputElement, ITextFieldProps>(
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
