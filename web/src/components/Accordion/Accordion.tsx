import * as React from 'react'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

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

/**
 * The props for the Accordion component, which handles
 * rendering the entire Accordion, including all sections.
 *
 * If you need a simple, easy to use component, use this.
 * Alternatively, you can use the AccordionRoot, AccordionItem, AccordionTrigger components etc.
 */
type AccordionPropsType = AccordionRootPropsType & {
  sections: IAccordionSectionProps[]
}

const Accordion = ({ sections, ...rootProps }: AccordionPropsType) => {
  return (
    <AccordionRoot {...rootProps}>
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

type AccordionRootPropsType = React.ComponentPropsWithRef<
  typeof AccordionPrimitive.Root
>
const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.PropsWithoutRef<AccordionRootPropsType>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={className} {...props} />
))

type AccordionItemPropsType = React.ComponentPropsWithRef<
  typeof AccordionPrimitive.Item
>
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.PropsWithoutRef<AccordionItemPropsType>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
))

type AccordionTriggerPropsType = React.ComponentPropsWithRef<
  typeof AccordionPrimitive.Trigger
>
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.PropsWithoutRef<AccordionTriggerPropsType>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'text-color-default flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

type AccordionContentPropsType = React.ComponentPropsWithRef<
  typeof AccordionPrimitive.Content
>
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.PropsWithoutRef<AccordionContentPropsType>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'prose-default overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
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
