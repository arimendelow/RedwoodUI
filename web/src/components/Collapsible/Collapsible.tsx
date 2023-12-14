import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import type {
  CollapsibleProps as ICollapsibleRootProps,
  CollapsibleTriggerProps as ICollapsibleTriggerProps,
  CollapsibleContentProps as ICollapsibleContentProps,
} from '@radix-ui/react-collapsible'

import Button from 'src/components/Button'
import { cn } from 'src/lib/utils'

interface ICollapsibleProps extends ICollapsibleRootProps {
  /**
   * The title text to show in the header of the collapsible.
   */
  title: string
  /**
   * The content to show when the Collapsible is collapsed.
   * This content will always be visible.
   */
  staticContent: React.ReactNode
  /**
   * The content to show when the Collapsible is expanded.
   * This content will be hidden when the Collapsible is collapsed.
   */
  collapsibleContent: React.ReactNode
}
/**
 * An easily used Collapsible component that assembles all the pieces together for you.
 * If you instead prefer to assemble the pieces yourself, you can use the `CollapsibleRoot`,
 * `CollapsibleTrigger`, and `CollapsibleContent` components directly.
 */
const Collapsible = ({
  title,
  staticContent,
  collapsibleContent,
  ...props
}: ICollapsibleProps) => {
  return (
    <CollapsibleRoot {...props}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-color-primary">{title}</span>
        <CollapsibleTrigger>
          <Button colorTreatment="minimal">
            <ChevronUpDownIcon className="h-5 w-5" />
          </Button>
        </CollapsibleTrigger>
      </div>
      {staticContent}
      <CollapsibleContent>{collapsibleContent}</CollapsibleContent>
    </CollapsibleRoot>
  )
}

const CollapsibleRoot = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  ICollapsibleRootProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} className={className} {...props} />
))

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  ICollapsibleTriggerProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger ref={ref} className={className} {...props} />
))

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  ICollapsibleContentProps
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down',
      className
    )}
    {...props}
  />
))

export default Collapsible
export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent }
