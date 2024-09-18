import { NumberField as RWNumberField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/ui/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropsType,
  inputFieldVariants,
} from 'src/ui/formFields/inputVariants'

interface INumberFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWNumberField>,
      'errorClassName'
    >,
    Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength'
    >,
    InputFieldVariantsPropsType {
  wrapperClassName?: string
}

const NumberField = React.forwardRef<HTMLInputElement, INumberFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      description,
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
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <RWNumberField
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

export default NumberField
