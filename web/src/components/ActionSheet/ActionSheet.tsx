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

/**
 * This is used internally by the component to determine what various values should be, based on the `side` prop.
 */
interface IActionSheetConfig {
  /**
   * The axis in which the actionSheet can be dragged.
   */
  drag: 'y' | 'x'
  /**
   * Together with `sizeCSS`, this makes up the CSS properties of the actionSheet.
   */
  positionCSS: React.CSSProperties
  /**
   * Together with `positionCSS`, this makes up the CSS properties of the actionSheet.
   */
  sizeCSS: React.CSSProperties
  /**
   * So that the actionSheet can be dragged away from the edge of the screen and look
   * as though it's growing, we have an 'overflow' div that extends past the edge.
   * This is the side-specific CSS for that div.
   *
   * Note that for positioning, you might want to make it overlap the ActionSheet by 1px so that
   * there's no visible gap between the two.
   */
  overflowCSS?: React.CSSProperties
  /**
   * The (motion) value that the actionSheet should start at, ie the value when the actionSheet is closed.
   */
  startValue: number
  /**
   * The (motion) value that the actionSheet should end at, ie the value when the actionSheet is open.
   */
  endValue: number
  /**
   * The constraints for where you can drag the actionSheet.
   */
  dragConstraints: Partial<BoundingBox>
  /**
   * A function that determines whether the actionSheet should close based on how the user has dragged it.
   */
  isClosing: (info: PanInfo) => boolean
}

interface IActionSheetProps {
  /**
   * The size of the actionSheet, in pixels.
   * This is the height if the actionSheet is on the top or bottom, or the width if the actionSheet is on the left or right.
   */
  size: number
  /**
   * The element that will trigger the actionSheet to open.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   */
  openButton: React.ReactNode
  /**
   * The element that will trigger the actionSheet to close.
   * You *do not* need to pass `onClick` to this element, it will be handled for you.
   * If you do not pass this, no close button will be rendered, and the user will have to click
   * outside the actionSheet or swipe it away to close it.
   */
  closeButton?: React.ReactNode
  /**
   * The side of the screen that the actionSheet should open from (and dismiss to).
   */
  side: 'top' | 'bottom' | 'left' | 'right'
  /**
   * The class name to apply to the actionSheet. This will be applied on the element that wraps the children.
   */
  className?: string
  children: React.ReactNode
}

const ActionSheet = ({
  size,
  openButton,
  closeButton,
  side,
  className,
  children,
}: IActionSheetProps) => {
  const [open, setOpen] = React.useState(true)
  const [scope, animate] = useAnimate()
  const willChange = useWillChange()

  const staticTransition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  }

  const config: IActionSheetConfig = (() => {
    switch (side) {
      case 'bottom':
        return {
          drag: 'y',
          positionCSS: { top: `calc(100vh - ${size}px)`, left: 0, right: 0 },
          sizeCSS: { height: size },
          overflowCSS: { top: size - 1, width: '100%', height: '100vh' },
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
          overflowCSS: { bottom: size - 1, width: '100%', height: '100vh' },
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
          overflowCSS: { right: size - 1, width: '100vh', height: '100%' },
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
          overflowCSS: { left: size - 1, width: '100vh', height: '100%' },
          startValue: size,
          endValue: 0,
          dragConstraints: { left: 0 },
          isClosing: (info: PanInfo) =>
            info.offset.x > window.innerWidth * 0.75 || info.velocity.x > 10,
        }
    }
  })()

  const position = useMotionValue(config.startValue)
  const actionSheetOpacity = useTransform(
    position,
    [config.endValue, config.startValue],
    [1, 0]
  )

  const closeActionSheet = async () => {
    await animate(position, config.startValue)
    setOpen(false)
  }

  const openActionSheet = async () => {
    await animate(position, config.endValue)
    setOpen(true)
  }

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(open) => (open ? openActionSheet() : closeActionSheet())}
    >
      <DialogPrimitive.Trigger asChild onClick={() => setOpen(true)}>
        {openButton}
      </DialogPrimitive.Trigger>

      <AnimatePresence onExitComplete={() => setOpen(false)}>
        {open && (
          <LayoutGroup>
            <DialogPrimitive.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[999] bg-neutral-700/80 backdrop-blur-sm"
                /** Unclear why this casing is needed */
                style={{
                  opacity: actionSheetOpacity as unknown as number,
                  ...willChange,
                }}
                onClick={closeActionSheet}
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
                    closeActionSheet()
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
                {closeButton && (
                  <DialogPrimitive.Close
                    className="absolute z-[1001]"
                    onClick={closeActionSheet}
                    asChild
                  >
                    {closeButton}
                  </DialogPrimitive.Close>
                )}
                {/* This extends past the edge of the screen so that if the actionSheet is dragged away
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

export default ActionSheet
