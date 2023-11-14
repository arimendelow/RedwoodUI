import { AnimatePresence, motion } from 'framer-motion'
import { HexColorPicker } from 'react-colorful'

import { HiddenField } from '@redwoodjs/forms'

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
      React.ComponentPropsWithoutRef<typeof HiddenField>,
      'errorClassName'
    >,
    Omit<IInputFieldWrapperProps, 'children' | 'className'>,
    InputFieldVariantsPropType {
  /**
   * The initial color to show in the picker, as a hex string.
   * We use hex because that's what HTML color inputs use:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
   */
  defaultInitialColor?: string
  wrapperClassName?: string
}

const ColorField = React.forwardRef<HTMLButtonElement, IColorFieldProps>(
  (
    {
      /** START for wrapper */
      name,
      label,
      maxLength,
      currentLength,
      optional,
      endComponent,
      hideErrorMessage,
      wrapperClassName,
      /** END for wrapper */
      defaultInitialColor = '#ffffff', // White

      inputTextSize,
      className,
      validation,
      ...props
    },
    ref
  ) => {
    const [color, setColor] = React.useState(defaultInitialColor)
    const [colorPickerOpen, setColorPickerOpen] = React.useState(false)
    return (
      <DropdownMenuRoot
        open={colorPickerOpen}
        onOpenChange={setColorPickerOpen}
      >
        <InputFieldWrapper
          name={name}
          label={label}
          maxLength={maxLength}
          currentLength={currentLength}
          optional={optional}
          endComponent={endComponent}
          hideErrorMessage={hideErrorMessage}
          className={wrapperClassName}
        >
          <DropdownMenuTrigger asChild>
            <button
              ref={ref}
              className={cn(inputFieldVariants({ inputTextSize, className }))}
              style={{ backgroundColor: color }}
              onClick={() => setColorPickerOpen(!colorPickerOpen)}
            >
              {' '}
              <HiddenField
                name={name}
                value={color}
                validation={
                  optional ? validation : { ...validation, required: true }
                }
                {...props}
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
                    onChange={setColor}
                  />
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenuPortal>
        {/* <RWColorField
          ref={ref}
          name={name}
          className={cn(
            inputFieldVariants({ inputTextSize, className }),
            'p-0'
          )}
          errorClassName={inputFieldVariants({
            colorTreatment: 'error',
            inputTextSize,
            className,
          })}
          // Automatically add the required validation if the field is not marked as optional
          validation={optional ? validation : { ...validation, required: true }}
          {...props}
        /> */}
      </DropdownMenuRoot>
    )
  }
)

export default ColorField
