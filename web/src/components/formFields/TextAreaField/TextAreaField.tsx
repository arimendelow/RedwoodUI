import { TextAreaField as RWTextAreaField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'

interface ITextAreaFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWTextAreaField>,
      'errorClassName'
    >,
    /**
     * We disable the endComponent prop as it doesn't work well with TextAreaField
     */
    Omit<IInputFieldWrapperProps, 'children' | 'className' | 'endComponent'>,
    InputFieldVariantsPropType {
  wrapperClassName?: string
}

const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  ITextAreaFieldProps
>(
  (
    {
      /** START for wrapper */
      name,
      label,
      description,
      maxLength,
      currentLength,
      optional,
      hideErrorMessage,
      wrapperClassName,
      /** END for wrapper */
      inputTextSize,
      className,
      validation,
      rows = 3,
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
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <RWTextAreaField
          ref={ref}
          name={name}
          className={inputFieldVariants({ inputTextSize, className })}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          rows={rows}
          validation={optional ? validation : { ...validation, required: true }}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default TextAreaField
