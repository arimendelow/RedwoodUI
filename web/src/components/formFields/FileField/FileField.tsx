import { FileField as RWFileField, useController } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'
import { cn } from 'src/lib/utils'

interface IFileFieldProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof RWFileField>,
      'errorClassName'
    >,
    /**
     * We disable the maxLength and currentLength props as they don't make sense with FileField
     */
    Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength'
    >,
    InputFieldVariantsPropType {
  wrapperClassName?: string
}

const FileField = React.forwardRef<HTMLButtonElement, IFileFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      description,
      maxLength,
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
    const {
      field,
      fieldState: { error: fieldError },
    } = useController({
      name,
      rules: {
        required: !optional,
        validate: (files) => {
          if (!optional) {
            return (
              (files && files.length > 0) || 'At least one file is required'
            )
          }
          return true // If not required, always return true
        },
        ...validation,
      },
    })
    // on rhfRef: assign to component's input ref to allow hook form to focus the error input.
    const { onChange: rhfOnChange, onBlur, ref: rhfRef, value } = field

    const hiddenFileInputRef = React.useRef<HTMLInputElement>(null)
    return (
      <InputFieldWrapper
        name={name}
        label={label}
        description={description}
        maxLength={maxLength}
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <input
          type="file"
          ref={hiddenFileInputRef}
          name={name}
          multiple
          className="hidden"
          onChange={rhfOnChange}
          value={value}
          {...props}
        />
        <button
          ref={(el) => {
            rhfRef(el)
            if (ref) {
              // Handling external ref if provided
              if (typeof ref === 'function') {
                ref(el)
              } else {
                ref.current = el
              }
            }
          }}
          onClick={(e) => {
            e.preventDefault() // don't submit the form
            hiddenFileInputRef.current?.click()
          }}
          className={cn(
            'cursor-pointer',
            inputFieldVariants({
              colorTreatment: fieldError ? 'error' : 'default',
              inputTextSize,
              className,
            })
          )}
          onBlur={onBlur}
        >
          {value ? (
            value
          ) : (
            <span
              className={
                fieldError
                  ? 'input-placeholder-text-error'
                  : 'input-placeholder-text'
              }
            >
              {props.placeholder}
            </span>
          )}
        </button>
      </InputFieldWrapper>
    )
  }
)

export default FileField
