import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'

import { cn } from 'src/lib/utils'

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
   * The class name to apply to the dialog. This will be applied on the element that wraps the children.
   */
  className?: string
  children: React.ReactNode
}

const Dialog = ({
  openButton,
  closeButton,
  className,
  children,
}: IDialogProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{openButton}</DialogPrimitive.Trigger>

      <AnimatePresence onExitComplete={() => setOpen(false)}>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay key="overlay" asChild>
              <motion.div
                className="dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content key="content" asChild>
              <motion.div
                className={cn(
                  'dialog-content fixed left-[50%] top-[50%] max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-clip rounded-default',
                  className
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {closeButton && (
                  <DialogPrimitive.Close className="absolute z-[1001]" asChild>
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
  )
}

export default Dialog
