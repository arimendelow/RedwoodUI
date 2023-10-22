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
  BoundingBox,
} from 'framer-motion'

import { cn } from 'src/lib/utils'

const staticTransition = {
  duration: 0.5,
  ease: [0.32, 0.72, 0, 1],
}

/**
 * This is used internally by the component to determine what various values should be, based on the `side` prop.
 */
interface IOverlayConfig {
  /**
   * The axis in which the overlay can be dragged.
   */
  drag: 'y' | 'x'
  /**
   * Together with `sizeCSS`, this makes up the CSS properties of the overlay.
   */
  positionCSS: React.CSSProperties
  /**
   * Together with `positionCSS`, this makes up the CSS properties of the overlay.
   */
  sizeCSS: React.CSSProperties
  /**
   * So that the overlay can be dragged away from the edge of the screen and look
   * as though it's growing, we have an 'overflow' div that extends past the edge.
   * This is the side-specific CSS for that div.
   */
  overflowCSS?: React.CSSProperties
  /**
   * The (motion) value that the overlay should start at, ie the value when the overlay is closed.
   */
  startValue: number
  /**
   * The (motion) value that the overlay should end at, ie the value when the overlay is open.
   */
  endValue: number
  /**
   * The constraints for where you can drag the overlay.
   */
  dragConstraints: Partial<BoundingBox>
  /**
   * A function that determines whether the overlay should close based on how the user has dragged it.
   */
  isClosing: (info: PanInfo) => boolean
}

interface IOverlayProps {
  /**
   * The element that will trigger the overlay to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   */
  openTrigger: React.ReactNode
  /**
   * The side of the screen that the overlay should open from (and dismiss to).
   */
  side: 'top' | 'bottom' | 'left' | 'right'
  /**
   * The class name to apply to the overlay. This will be applied on the element that wraps the children.
   */
  className?: string
  children: React.ReactNode
}

const Overlay = ({ openTrigger, side, className, children }: IOverlayProps) => {
  const [open, setOpen] = React.useState(false)
  const [scope, animate] = useAnimate()
  const willChange = useWillChange()

  const size = 250

  const config: IOverlayConfig = (() => {
    switch (side) {
      case 'bottom':
        return {
          drag: 'y',
          positionCSS: { top: `calc(100vh - ${size}px)`, left: 0, right: 0 },
          sizeCSS: { height: size },
          overflowCSS: { top: size, width: '100%', height: '100vh' },
          startValue: size,
          endValue: 0,
          dragConstraints: { top: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.y > window.innerHeight * 0.75 || info.velocity.y > 10,
        }
      case 'top':
        return {
          drag: 'y',
          positionCSS: { top: 0, left: 0, right: 0 },
          sizeCSS: { height: size },
          overflowCSS: { bottom: size, width: '100%', height: '100vh' },
          startValue: -size,
          endValue: 0,
          dragConstraints: { bottom: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.y < window.innerHeight * -0.75 || info.velocity.y < -10,
        }
      case 'left':
        return {
          drag: 'x',
          positionCSS: { top: 0, left: 0, bottom: 0 },
          sizeCSS: { width: size },
          overflowCSS: { right: size, width: '100vh', height: '100%' },
          startValue: -size,
          endValue: 0,
          dragConstraints: { right: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.x < window.innerWidth * -0.75 || info.velocity.x < -10,
        }
      case 'right':
        return {
          drag: 'x',
          positionCSS: { top: 0, right: 0, bottom: 0 },
          sizeCSS: { width: size },
          overflowCSS: { left: size, width: '100vh', height: '100%' },
          startValue: size,
          endValue: 0,
          dragConstraints: { left: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.x > window.innerWidth * 0.75 || info.velocity.x > 10,
        }
    }
  })()

  const position = useMotionValue(config.startValue)
  const overlayOpacity = useTransform(
    position,
    [config.endValue, config.startValue],
    [1, 0]
  )

  const onClose = async () => {
    await animate(position, config.startValue)
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
                className="fixed inset-0 z-[999] bg-neutral-700/80 backdrop-blur-sm"
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
                className={cn(
                  'bg-default text-default absolute z-[1000] shadow-lg',
                  className
                )}
                initial={{ [config.drag]: config.startValue }}
                animate={{ [config.drag]: config.endValue }}
                exit={{ [config.drag]: config.startValue }}
                transition={staticTransition}
                style={{
                  [config.drag]: position,
                  ...config.sizeCSS,
                  ...config.positionCSS,
                  ...willChange,
                }}
                drag={config.drag}
                dragConstraints={config.dragConstraints}
                onDragEnd={(_e, info) => {
                  if (config.isClosing(info)) {
                    onClose()
                  } else {
                    animate(position, config.endValue, {
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
                {/* This extends past the edge of the screen so that if the overlay is dragged away
                from the edge, it appears to be stretching */}
                <div
                  className="bg-default absolute z-[1000]"
                  style={config.overflowCSS}
                />
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
