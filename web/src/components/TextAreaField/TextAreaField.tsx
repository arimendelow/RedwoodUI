import { TextAreaField as RWTextAreaField } from '@redwoodjs/forms'

import InputFieldWrapper, {
  InputFieldProps,
} from 'src/components/forms/InputFieldWrapper'
import { inputFieldVariants } from 'src/components/forms/inputVariants'

const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  /**
   * We disable the endComponent prop as it doesn't work well with TextAreaField,
   * and we swap 'htmlInputElementSize' out for 'rows' as that's what's used by the HTMLTextArea
   */
  Omit<InputFieldProps, 'endComponent' | 'htmlInputElementSize'> & {
    rows?: number
  }
>(
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
      // endComponent,
      className,
      inputTextSize,
      rows = 3,
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
        // endComponent={endComponent}
        currentLength={currentLength}
      >
        <RWTextAreaField
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
          rows={rows}
          {...props}
        />
      </InputFieldWrapper>
    )
  }
)

export default TextAreaField
