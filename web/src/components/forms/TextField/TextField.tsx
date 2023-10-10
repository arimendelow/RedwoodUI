import { TextField as RWTextField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  StyledFieldProps,
} from 'src/components/forms/InputFieldWrapper'
import { cn } from 'src/lib/utils'

const TextField = React.forwardRef<HTMLInputElement, StyledFieldProps>(
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
      grow,
      inline = false,
      optional,
      endComponent,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <InputFieldWrapper
        label={label}
        name={name}
        maxLength={maxLength}
        currentLength={currentLength}
        inline={inline}
        optional={optional}
        endComponent={endComponent}
      >
        <RWTextField
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn('input-field', className, grow && 'md:text-lg')}
          validation={optional ? validation : { ...validation, required: true }}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default TextField
