import { AnimatePresence, motion } from 'framer-motion'
import { HexColorPicker } from 'react-colorful'

import { useController } from '@redwoodjs/forms'

import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropsType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'
import {
  PopoverRoot,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from 'src/components/Popover'
import { cn } from 'src/lib/utils'

interface IColorFieldProps
  extends Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength'
    >,
    InputFieldVariantsPropsType {
  /**
   * The initial color to show in the picker, as a hex string.
   * We use hex because that's what HTML color inputs use:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
   */
  initialColor?: string
  placeholder?: string
  className?: string
  wrapperClassName?: string
}

const ColorField = ({
  /** START for wrapper */
  name,
  label,
  description,
  optional,
  endComponent,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  initialColor,
  placeholder,
  inputTextSize,
  className,
}: IColorFieldProps) => {
  const [color, setColor] = React.useState(initialColor)
  const [colorPickerOpen, setColorPickerOpen] = React.useState(false)

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    rules: { required: !optional },
  })
  const { onChange: rhfOnChange, onBlur, ref } = field
  return (
    <PopoverRoot open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
      <input name={name} type="hidden" value={color || ''} />
      <InputFieldWrapper
        name={name}
        label={label}
        description={description}
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <PopoverTrigger asChild>
          <input
            type="text" // need this so that the placeholder text shows up
            ref={ref}
            readOnly
            placeholder={color ? undefined : placeholder}
            className={cn(
              'cursor-pointer',
              inputFieldVariants({
                colorTreatment: fieldError ? 'error' : 'default',
                inputTextSize,
                className,
              })
            )}
            style={{ backgroundColor: color }}
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            onBlur={onBlur}
          />
        </PopoverTrigger>
      </InputFieldWrapper>
      <PopoverPortal forceMount>
        <AnimatePresence>
          {colorPickerOpen && (
            <PopoverContent
              className="w-[var(--radix-popover-trigger-width)] overflow-visible p-0"
              sideOffset={12} // same as Combobox and Select
              asChild
            >
              <motion.div
                initial={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                }}
                animate={{
                  opacity: 1,
                  transform: 'scale(1)',
                }}
                exit={{
                  opacity: 0,
                  transform: 'scale(0.9)',
                }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
              >
                <HexColorPicker
                  id="color-picker"
                  className="!w-full"
                  color={color}
                  onChange={(value) => {
                    setColor(value)
                    rhfOnChange(value)
                  }}
                />
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </PopoverPortal>
    </PopoverRoot>
  )
}

export default ColorField
