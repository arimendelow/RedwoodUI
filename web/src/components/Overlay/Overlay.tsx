/**
 * Requires 'tailwindcss-animate' plugin:
 * - run `yarn workspace web add tailwindcss-animate`
 * - add the following to `tailwind.config.js`:
 * ```
 * plugins: [
 *   ...
 *   require('tailwindcss-animate')
 * ]
 */

import * as DialogPrimitive from '@radix-ui/react-dialog'

import { cn, useComposedRefs } from 'src/lib/utils'

import { OverlayContext, useOverlayContext } from './OverlayContext'

interface IOverlayProps {
  children?: React.ReactNode
}

/**
 * Contains all the parts of an overlay.
 * Wrap overlay trigger and content in this.
 */
const Root = ({ children }: IOverlayProps) => {
  const backdropRef = React.useRef<HTMLDivElement>(null)
  const contentContainerRef = React.useRef<HTMLDivElement>(null)
  return <DialogPrimitive.Root>{children}</DialogPrimitive.Root>
}

/**
 * The button that opens the overlay.
 */
const OpenTrigger = DialogPrimitive.Trigger

/**
 * When used, portals your overlay and content parts into the `body`.
 */
const Portal = DialogPrimitive.Portal

/**
 * A layer that covers the inert portion of the view when the overlay is open.
 */
const Backdrop = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function ({ className, ...rest }, ref) {
  const { backdropRef } = useOverlayContext()
  const composedRef = useComposedRefs(ref, backdropRef)

  return (
    <DialogPrimitive.Overlay
      ref={composedRef}
      className={cn(
        'bg-background/80 fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...rest}
    />
  )
})

/**
 * Use this to wrap the content to be rendered in the open overlay.
 */
const ContentContainer = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(function ({ children, className, ...rest }, ref) {
  const { contentContainerRef } = useOverlayContext()
  const composedRef = useComposedRefs(ref, contentContainerRef)

  return (
    <DialogPrimitive.Content
      ref={composedRef}
      className={cn(
        'bg-default fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
        className
      )}
      {...rest}
    >
      {children}
    </DialogPrimitive.Content>
  )
})

/**
 * An accessible title to be announced when the dialog is opened.
 */
const Title = DialogPrimitive.Title

/**
 * An optional accessible description to be announced when the dialog is opened.
 */
const Description = DialogPrimitive.Description

/**
 * The button that closes the overlay.
 */
const CloseTrigger = DialogPrimitive.Close

const Overlay = {
  Root,
  OpenTrigger,
  Portal,
  Backdrop,
  ContentContainer,
  Title,
  Description,
  CloseTrigger,
}

export default Overlay
