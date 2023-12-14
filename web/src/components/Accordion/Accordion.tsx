import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type {
  AccordionSingleProps,
  AccordionMultipleProps,
  AccordionItemProps as IAccordionItemProps,
  AccordionTriggerProps as IAccordionTriggerProps,
  AccordionContentProps as IAccordionContentProps,
} from '@radix-ui/react-accordion'

import { cn } from 'src/lib/utils'

interface IAccordionSectionProps {
  /**
   * The Trigger is the clickable part of the section.
   * It toggles the collapsed state of the Content.
   */
  trigger: React.ReactNode | string
  /**
   * The Content is the collapsible part of the section.
   */
  content: React.ReactNode | string
}
type AccordionPropsType = AccordionRootPropsType & {
  sections: IAccordionSectionProps[]
}

/**
 * The props for the Accordion component, which handles
 * rendering the entire Accordion, including all sections.
 *
 * If you need a simple, easy to use component, use this.
 * Alternatively, you can use the AccordionRoot, AccordionItem, AccordionTrigger components etc.
 */
const Accordion = ({ sections, ...props }: AccordionPropsType) => {
  return (
    <AccordionRoot {...props}>
      {sections.map((section, index) => {
        const { trigger, content } = section
        return (
          <AccordionItem key={index} value={index.toString()}>
            <AccordionTrigger>{trigger}</AccordionTrigger>
            <AccordionContent>{content}</AccordionContent>
          </AccordionItem>
        )
      })}
    </AccordionRoot>
  )
}

type AccordionRootPropsType = AccordionSingleProps | AccordionMultipleProps
const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionRootPropsType
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={className} {...props} />
))

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  IAccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
))

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  IAccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'text-color-primary flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  IAccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'prose-default overflow-hidden transition-all data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down',
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))

export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
