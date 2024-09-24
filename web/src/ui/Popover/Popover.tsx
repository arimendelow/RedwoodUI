import * as PopoverPrimitive from '@radix-ui/react-popover'
import type {
  PopoverTriggerProps as IPopoverTriggerProps,
  PopoverContentProps as IPopoverContentProps,
  PopoverArrowProps as IPopoverArrowProps,
  PopoverCloseProps as IPopoverCloseProps,
} from '@radix-ui/react-popover'

import { cn } from 'src/lib/uiUtils'

/**
 * Contains all the parts of a popover.
 */
const PopoverRoot = PopoverPrimitive.Root

/**
 * The button that toggles the popover. By default,
 * the `PopoverContent` will position itself against the trigger.

 */
const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  IPopoverTriggerProps
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} {...props} />)

/**
 * An optional element to position the `PopoverContent` against.
 * If this part is not used, the content will position alongside the `PopoverTrigger`.
 */
const PopoverAnchor = PopoverPrimitive.Anchor

/**
 * When used, portals the content part into the `body`.
 */
const PopoverPortal = PopoverPrimitive.Portal

/**
 * The component that pops out when the popover is open.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  IPopoverContentProps
>(({ className, sideOffset = 10, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    className={cn('dropdown-content-menu', className)}
    sideOffset={sideOffset}
    {...props}
  />
))

/**
 * An optional arrow element to render alongside the popover.
 * This can be used to help visually link the trigger with the `PopoverContent`.
 * Must be rendered inside `PopoverContent`.
 */
const PopoverArrow = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Arrow>,
  IPopoverArrowProps
>((props, ref) => <PopoverPrimitive.Arrow ref={ref} {...props} />)

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  IPopoverCloseProps
>((props, ref) => <PopoverPrimitive.Close ref={ref} {...props} />)

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverClose,
}
