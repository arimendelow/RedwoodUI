import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  LayoutGroup,
  useAnimate,
  useWillChange,
  PanInfo,
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
  side: 'top' | 'bottom'
}

const Overlay = ({ openTrigger, children, side }: IOverlayProps) => {
  const [open, setOpen] = React.useState(false)
  const [scope, animate] = useAnimate()
  const willChange = useWillChange()

  const size = 250

  const config = (() => {
    switch (side) {
      case 'bottom':
        return {
          positionCSS: { top: `calc(100vh - ${size}px)`, left: 0, right: 0 },
          startValue: size,
          endValue: 0,
          dragConstraints: { top: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.y > window.innerHeight * 0.75 || info.velocity.y > 10,
        }
      case 'top':
        return {
          positionCSS: { top: 0, left: 0, right: 0 },
          startValue: -size,
          endValue: 0,
          dragConstraints: { bottom: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.y < window.innerHeight * -0.75 || info.velocity.y < -10,
        }
    }
  })()

  const y = useMotionValue(config.startValue)
  const overlayOpacity = useTransform(
    y,
    [config.endValue, config.startValue],
    [1, 0]
  )

  const onClose = async () => {
    await animate(y, config.startValue)
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
                style={{
                  opacity: overlayOpacity as unknown as number,
                  ...willChange,
                }}
                onClick={onClose}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content key="content" asChild>
              <motion.div
                ref={scope}
                key="content"
                // h-screen is needed so that you can drag the Overlay away from the edge of the screen without it having an edge.
                className="bg-default text-default absolute z-[10000] shadow-lg"
                initial={{ y: config.startValue }}
                animate={{ y: config.endValue }}
                exit={{ y: config.startValue }}
                transition={staticTransition}
                style={{
                  y,
                  height: size,
                  ...config.positionCSS,
                  ...willChange,
                }}
                drag="y"
                dragConstraints={config.dragConstraints}
                onDragEnd={(_e, info) => {
                  if (config.isClosing(info)) {
                    onClose()
                  } else {
                    animate(y, config.endValue, {
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
