import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import Button from 'ui/Button'
import { IDialogProps } from 'ui/Dialog'

import { cn } from 'src/lib/uiUtils'

/**
 * The AlertDialog has much in common with the Dialog, but it is designed to be used for
 * alerts, not for general purpose dialogs.
 * Therefore, instead of redefining all the props, we just omit the ones that don't make sense
 * for an alert.
 */
interface IActionDialogProps
  extends Omit<IDialogProps, 'heightOnSmallScreen' | 'closeButton'> {}

/**
 * The AlertDialog is a Dialog that is designed to be used for alerts, not for general purpose dialogs.
 * Notable differences:
 * - The AlertDialog does not have a close button.
 * - The AlertDialog cannot be dismissed by clicking outside of it.
 * - The AlertDialog does not render as an ActionSheet on small screens.
 */
const AlertDialog = ({
  openButton,
  className,
  open: openControlled,
  setOpen: setOpenControlled,
  children,
}: IActionDialogProps) => {
  const [openUncontrolled, setOpenUncontrolled] = React.useState(false)
  if (
    (openControlled !== undefined && setOpenControlled === undefined) ||
    (openControlled === undefined && setOpenControlled !== undefined)
  ) {
    throw new Error('You must pass in both `open` and `setOpen`, or neither.')
  }
  const open = openControlled ?? openUncontrolled
  const setOpen = setOpenControlled ?? setOpenUncontrolled

  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        {openButton}
      </AlertDialogPrimitive.Trigger>
      <AnimatePresence onExitComplete={() => setOpen(false)}>
        {open && (
          <AlertDialogPrimitive.Portal forceMount>
            <AlertDialogPrimitive.Overlay key="overlay" asChild>
              <motion.div
                className="dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut' }}
              />
            </AlertDialogPrimitive.Overlay>
            <AlertDialogPrimitive.Content key="content" asChild>
              <motion.div
                className={cn('dialog-content dialog-position', className)}
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
                transition={{ ease: 'easeInOut' }}
              >
                {children}
              </motion.div>
            </AlertDialogPrimitive.Content>
          </AlertDialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </AlertDialogPrimitive.Root>
  )
}

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('dialog-title', className)}
    {...props}
  />
))

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('prose-default', className)}
    {...props}
  />
))

interface IAlertContentWithActionsProps {
  /**
   * The title of the alert dialog.
   */
  title: string
  /**
   * The description of the alert dialog.
   */
  description: string
  /**
   * The text of the action button.
   */
  actionText: string
  /**
   * The callback to run when the action button is clicked.
   * Closing the alert dialog is handled automatically.
   */
  onConfirm: () => void
  /**
   * The text of the cancel button.
   * @default 'Cancel'
   */
  cancelText?: string
}

/**
 * Component for the most common use of an AlertDialog - a title, a description, and action/cancel buttons.
 * Should be used as the child of an AlertDialog.
 */
const AlertContentWithActions = ({
  title,
  description,
  actionText,
  onConfirm,
  cancelText = 'Cancel',
}: IAlertContentWithActionsProps) => {
  const cancelBtnRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    cancelBtnRef.current?.focus()
  }, [])
  return (
    <div className="max-w-sm">
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>{description}</AlertDialogDescription>
      <div className="mt-5 flex flex-col justify-start gap-2 sm:flex-row-reverse">
        <AlertDialogPrimitive.Action onClick={onConfirm} asChild>
          <Button colorTreatment="danger" size="lg">
            {actionText}
          </Button>
        </AlertDialogPrimitive.Action>
        <AlertDialogPrimitive.Cancel asChild>
          <Button ref={cancelBtnRef} colorTreatment="secondary" size="lg">
            {cancelText}
          </Button>
        </AlertDialogPrimitive.Cancel>
      </div>
    </div>
  )
}

export default AlertDialog
export { AlertDialogTitle, AlertDialogDescription, AlertContentWithActions }
