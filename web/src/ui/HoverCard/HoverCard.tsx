import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import {
  HoverCardProps as IHoverCardRootProps,
  PopperContentProps,
} from '@radix-ui/react-hover-card'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from 'src/lib/utils'

interface IHoverCardProps extends IHoverCardRootProps {
  /**
   * The item that opens the hover card when hovered or focused.
   */
  trigger: React.ReactNode
  /**
   * The content to render inside the hover card.
   */
  content: React.ReactNode
  /**
   * The preferred side of the trigger to render against when open.
   * Will be reversed when collisions occur and `avoidCollisions` is enabled.
   */
  side?: PopperContentProps['side']
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   */
  align?: PopperContentProps['align']
  /**
   * The distance in pixels from the trigger.
   */
  sideOffset?: PopperContentProps['sideOffset']
}

const HoverCard = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center',
  sideOffset = 10,
  ...props
}: IHoverCardProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <HoverCardRoot open={open} onOpenChange={setOpen} {...props}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardPortal forceMount>
        <AnimatePresence>
          {open && (
            <HoverCardContent
              asChild
              side={side}
              align={align}
              sideOffset={sideOffset}
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
                {content}
              </motion.div>
            </HoverCardContent>
          )}
        </AnimatePresence>
      </HoverCardPortal>
    </HoverCardRoot>
  )
}

const HoverCardRoot = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardPortal = HoverCardPrimitive.Portal

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    className={cn('dropdown-content-base', className)}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export default HoverCard
export { HoverCardRoot, HoverCardTrigger, HoverCardPortal, HoverCardContent }
