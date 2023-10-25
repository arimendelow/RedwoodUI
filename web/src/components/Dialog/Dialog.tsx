import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

import ActionSheet from 'src/components/ActionSheet/ActionSheet'
import { cn, useSmallScreen } from 'src/lib/utils'

interface IDialogProps {
  /**
   * The element that will trigger the dialog to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   */
  openButton: React.ReactNode
  /**
   * The element that will trigger the dialog to close.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   * If you do not pass this, no close button will be rendered, and the user will have to click
   * outside the dialog to close it.
   */
  closeButton?: React.ReactNode
  /**
   * On smaller screens, the ActionSheet is rendered instead of the Dialog.
   * This is the height of the ActionSheet, in pixels.
   */
  heightOnSmallScreen: number
  /**
   * The class name to apply to the dialog. This will be applied on the element that wraps the children.
   */
  className?: string
  /**
   * Use this to control the open state of the Dialog.
   * If you pass this in, you must also pass in `setOpen`.
   * If you do not pass this in, the Dialog will be uncontrolled and will manage its own open state.
   */
  open?: boolean
  /**
   * Use this to control the open state of the Dialog.
   * If you pass this in, you must also pass in `open`.
   * If you do not pass this in, the Dialog will be uncontrolled and will manage its own open state.
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const Dialog = ({
  openButton,
  closeButton,
  heightOnSmallScreen,
  className,
  open: openControlled,
  setOpen: setOpenControlled,
  children,
}: IDialogProps) => {
  const [openUncontrolled, setOpenUncontrolled] = React.useState(false)
  if (
    (openControlled !== undefined && setOpenControlled === undefined) ||
    (openControlled === undefined && setOpenControlled !== undefined)
  ) {
    throw new Error('You must pass in both `open` and `setOpen`, or neither.')
  }
  const open = openControlled ?? openUncontrolled
  const setOpen = setOpenControlled ?? setOpenUncontrolled

  const isSmallScreen = useSmallScreen()

  if (isSmallScreen) {
    return (
      <ActionSheet
        size={heightOnSmallScreen}
        side="bottom"
        openButton={openButton}
        closeButton={closeButton}
        open={open}
        setOpen={setOpen}
      >
        {children}
      </ActionSheet>
    )
  } else {
    return (
      <>
        <div className="block sm:hidden"></div>
        <div className="hidden sm:block">
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
              {openButton}
            </DialogPrimitive.Trigger>

            <AnimatePresence onExitComplete={() => setOpen(false)}>
              {open && (
                <DialogPrimitive.Portal forceMount>
                  <DialogPrimitive.Overlay key="overlay" asChild>
                    <motion.div
                      className="dialog-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: 'easeInOut' }}
                    />
                  </DialogPrimitive.Overlay>
                  <DialogPrimitive.Content key="content" asChild>
                    <motion.div
                      className={cn(
                        'dialog-content fixed left-[50%] top-[50%] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-clip rounded-default',
                        className
                      )}
                      initial={{ opacity: 0, zoom: 0.9 }}
                      animate={{ opacity: 1, zoom: 1 }}
                      exit={{ opacity: 0, zoom: 0.9 }}
                      transition={{ ease: 'easeInOut' }}
                    >
                      {closeButton && (
                        <DialogPrimitive.Close
                          className="absolute z-[1001]"
                          asChild
                        >
                          {closeButton}
                        </DialogPrimitive.Close>
                      )}
                      {children}
                    </motion.div>
                  </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
              )}
            </AnimatePresence>
          </DialogPrimitive.Root>
        </div>
      </>
    )
  }
}

export default Dialog
