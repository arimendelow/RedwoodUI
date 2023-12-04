import { UrlField as RWUrlField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropsType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'

interface IUrlFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWUrlField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropsType {
  wrapperClassName?: string
}

const UrlField = React.forwardRef<HTMLInputElement, IUrlFieldProps>(
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
    /**
     * Combine the default URL pattern validation with any custom validation.
     * Note that this email pattern is very basic.....
     * TODO update this regex to be for a URL
     */
    const combinedValidation = React.useMemo(
      () => ({ pattern: /^\S+@\S+$/i, ...validation }),
      [validation]
    )
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
        <RWUrlField
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

export default UrlField
