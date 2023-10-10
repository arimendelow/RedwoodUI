import { PasswordField as RWPasswordField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  InputFieldProps,
} from 'src/components/forms/InputFieldWrapper'
import { inputFieldVariants } from 'src/components/forms/inputVariants'

const PasswordField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      name,
      label,
      defaultValue,
      onChange,
      onKeyDown,
      validation,
      maxLength,
      currentLength,
      placeholder = '••••••••',
      disabled,
      inline = false,
      optional,
      endComponent,
      className,
      inputTextSize,
      htmlInputElementSize,
      ...props
    },
    ref
  ) => {
    return (
      <InputFieldWrapper
        label={label}
        name={name}
        maxLength={maxLength}
        inline={inline}
        optional={optional}
        endComponent={endComponent}
        currentLength={currentLength}
      >
        <RWPasswordField
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputFieldVariants({ inputTextSize, className })}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          validation={optional ? validation : { ...validation, required: true }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          size={htmlInputElementSize}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default PasswordField
