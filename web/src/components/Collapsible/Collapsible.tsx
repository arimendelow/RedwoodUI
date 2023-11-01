import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

import Button from 'src/components/Button'
import { cn } from 'src/lib/utils'

type CollapsiblePropsType = CollapsibleRootPropsType & {
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
  ...rootProps
}: CollapsiblePropsType) => {
  return (
    <CollapsibleRoot {...rootProps}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-color-default">{title}</span>
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

type CollapsibleRootPropsType = React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.Root
>
const CollapsibleRoot = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.PropsWithoutRef<CollapsibleRootPropsType>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root ref={ref} className={className} {...props} />
))

type CollapsibleTriggerPropsType = React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.Trigger
>
const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.PropsWithoutRef<CollapsibleTriggerPropsType>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger ref={ref} className={className} {...props} />
))

type CollapsibleContentPropsType = React.ComponentPropsWithRef<
  typeof CollapsiblePrimitive.Content
>
const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.PropsWithoutRef<CollapsibleContentPropsType>
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
