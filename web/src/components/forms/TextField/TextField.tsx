import { TextField as RWTextField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  InputFieldProps,
} from 'src/components/forms/InputFieldWrapper'
import { inputFieldVariants } from 'src/components/forms/inputVariants'

const TextField = React.forwardRef<HTMLInputElement, InputFieldProps>(
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
      placeholder,
      disabled,
      inline = false,
      optional,
      endComponent,
      className,
      size,
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
        <RWTextField
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputFieldVariants({ size, className })}
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

export default TextField
