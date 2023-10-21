import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  LayoutGroup,
  useAnimate,
} from 'framer-motion'

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
}

interface IOverlayProps {
  /**
   * The element that will trigger the overlay to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   */
  openTrigger: React.ReactNode
  children: React.ReactNode
}

const Overlay = ({ openTrigger, children }: IOverlayProps) => {
  const [open, setOpen] = React.useState(false)
  const [scope, animate] = useAnimate()

  const h = 300
  const y = useMotionValue(h)
  const overlayOpacity = useTransform(y, [0, h], [1, 0])

  const onClose = async () => {
    await animate(y, h)
    setOpen(false)
  }

  return (
    // Instead of letting Radix Dialog handle the open/close state, Framer Motion will.
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Trigger asChild onClick={() => setOpen(true)}>
        {openTrigger}
      </DialogPrimitive.Trigger>

      <AnimatePresence onExitComplete={() => setOpen(false)}>
        {open && (
          <LayoutGroup>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[9999] bg-neutral-700/80 backdrop-blur-sm"
                /** Unclear why this casing is needed */
                style={{ opacity: overlayOpacity as unknown as number }}
                onClick={onClose}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content key="content" asChild>
              <motion.div
                ref={scope}
                key="content"
                // h-screen is needed so that you can drag the Overlay away from the edge of the screen without it having an edge.
                className="bg-default text-default absolute bottom-0 left-2 right-2 z-[10000] h-screen shadow-lg"
                initial={{ y: h }}
                animate={{ y: 0 }}
                exit={{ y: h }}
                transition={staticTransition}
                style={{
                  y,
                  top: `calc(100vh - ${h}px)`,
                }}
                drag="y"
                dragConstraints={{ top: 0 }}
                onDragEnd={(_e, { offset, velocity }) => {
                  if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                    onClose()
                  } else {
                    animate(y, 0, {
                      type: 'inertia',
                      bounceStiffness: 300,
                      bounceDamping: 40,
                      timeConstant: 300,
                      min: 0,
                      max: 0,
                    })
                  }
                }}
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </LayoutGroup>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}

export default Overlay
