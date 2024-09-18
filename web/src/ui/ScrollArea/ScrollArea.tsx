import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import type {
  ScrollAreaProps as IScrollAreaRootProps,
  ScrollAreaViewportProps as IScrollAreaViewportProps,
  ScrollAreaScrollbarProps as IScrollAreaScrollbarProps,
  ScrollAreaThumbProps as IScrollAreaThumbProps,
  ScrollAreaCornerProps as IScrollAreaCornerProps,
} from '@radix-ui/react-scroll-area'

import { cn } from 'src/lib/utils'

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaRoot>,
  IScrollAreaRootProps
>(({ children, ...props }, ref) => {
  return (
    <ScrollAreaRoot ref={ref} {...props}>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      <ScrollAreaScrollbar forceMount>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
})

/** Contains all the parts of a scroll area. */
const ScrollAreaRoot = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  IScrollAreaRootProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('', className)}
    {...props}
  />
))

/** The viewport area of the scroll area. */
const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  IScrollAreaViewportProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    ref={ref}
    className={cn('bg-default h-full w-full rounded-[inherit]', className)}
    {...props}
  />
))

/** The vertical scrollbar. Add a second `ScrollAreaScrollbar` with an `orientation` prop to enable horizontal scrolling. */
const ScrollAreaScrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
  IScrollAreaScrollbarProps
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      // Designed to mimic macOS scrollbar fade out
      'data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100 data-[state=hidden]:transition-opacity data-[state=hidden]:duration-[200ms] data-[state=hidden]:ease-out',
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  />
))

/** The thumb to be used in `ScrollAreaScrollbar`. */
const ScrollAreaThumb = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Thumb>,
  IScrollAreaThumbProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Thumb
    ref={ref}
    className={cn(
      'relative flex-1 rounded-full bg-neutral-900/50 backdrop-blur dark:bg-neutral-100/60',
      className
    )}
    {...props}
  />
))

/** The corner where both vertical and horizontal scrollbars meet. */
const ScrollAreaCorner = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Corner>,
  IScrollAreaCornerProps
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Corner ref={ref} className={className} {...props} />
))

export default ScrollArea
export {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
}
