import { AnimatePresence, motion } from 'framer-motion'
import { HexColorPicker } from 'react-colorful'

import { useController } from '@redwoodjs/forms'

import {
  DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from 'src/components/DropdownMenu'
import InputFieldWrapper, {
  IInputFieldWrapperProps,
} from 'src/components/formFields/InputFieldWrapper/InputFieldWrapper'
import {
  InputFieldVariantsPropType,
  inputFieldVariants,
} from 'src/components/formFields/inputVariants'
import { cn } from 'src/lib/utils'

interface IColorFieldProps
  extends Omit<
      IInputFieldWrapperProps,
      'children' | 'className' | 'maxLength' | 'currentLength'
    >,
    Omit<InputFieldVariantsPropType, 'inputTextSize'> {
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
  optional,
  endComponent,
  hideErrorMessage,
  wrapperClassName,
  /** END for wrapper */
  initialColor,
  placeholder,
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
    <DropdownMenuRoot open={colorPickerOpen} onOpenChange={setColorPickerOpen}>
      <InputFieldWrapper
        name={name}
        label={label}
        optional={optional}
        endComponent={endComponent}
        hideErrorMessage={hideErrorMessage}
        className={wrapperClassName}
      >
        <DropdownMenuTrigger asChild>
          <button
            className="w-full"
            onClick={() => setColorPickerOpen(!colorPickerOpen)}
            onBlur={onBlur}
          >
            <input
              ref={ref}
              readOnly
              placeholder={color ? undefined : placeholder}
              className={cn(
                'cursor-pointer',
                inputFieldVariants({
                  colorTreatment: fieldError ? 'error' : 'default',
                  className,
                })
              )}
              style={{ backgroundColor: color }}
            />
          </button>
        </DropdownMenuTrigger>
      </InputFieldWrapper>
      <DropdownMenuPortal forceMount>
        <AnimatePresence>
          {colorPickerOpen && (
            <DropdownMenuContent
              className="w-[var(--radix-dropdown-menu-trigger-width)] overflow-visible p-0"
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
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
}

export default ColorField
