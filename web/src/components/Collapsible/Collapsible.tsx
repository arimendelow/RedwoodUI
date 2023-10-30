import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'

import { cn } from 'src/lib/utils'

type CollapsiblePropsType = CollapsibleRootPropsType & {
  title: string
  trigger: React.ReactNode
  unCollapsedContent: React.ReactNode
  collapsibleContent: React.ReactNode
}
const Collapsible = ({
  title,
  trigger,
  unCollapsedContent,
  collapsibleContent,
  ...rootProps
}: CollapsiblePropsType) => {
  return (
    <CollapsibleRoot {...rootProps}>
      <div className="flex items-center justify-between">
        <span className="text-color-default">{title}</span>
        <CollapsibleTrigger>{trigger}</CollapsibleTrigger>
      </div>
      {unCollapsedContent}
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
