import { ChevronDownIcon } from '@heroicons/react/24/outline'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {
  AnimatePresence,
  motion,
  useAnimate,
  useMotionValue,
  useWillChange,
} from 'framer-motion'

import { cn, mergeRefs, useDataStateObserver } from 'src/lib/utils'

const AccordionContainer = AccordionPrimitive.Root

interface IAccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  trigger: React.ReactNode
  itemContent: React.ReactNode
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  IAccordionItemProps
>(({ trigger, itemContent, className, value, ...props }, ref) => {
  const [animationScope, animate] = useAnimate()
  const contentHeightClosed = '0'
  const contentHeightOpen = 'var(--radix-accordion-content-height)'

  const updateAnimation = (state: string) => {
    if (state === 'open') {
      animate(
        animationScope.current,
        {
          height: contentHeightOpen,
        },
        { duration: 2 }
      ).then(() => console.log('opened animation done'))
    } else {
      animate(
        animationScope.current,
        {
          height: contentHeightClosed,
        },
        { duration: 2 }
      ).then(() => console.log('closed animation done'))
    }
  }

  const contentRef = React.useRef<HTMLDivElement>(null)
  const mutationObserver = new MutationObserver(
    async (mutations, _observer) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          const state = (mutation.target as HTMLElement).dataset.state as string
          updateAnimation(state)
          console.log('state', state)
        }
      })
    }
  )

  React.useEffect(() => {
    if (contentRef.current) {
      mutationObserver.observe(contentRef.current, {
        attributes: true,
      })
    }
    return () => {
      mutationObserver.disconnect()
    }
  })

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('text-color-default border-b', className)}
      /**
       * Instead of requiring a unique value passed in for each item, we'll just generate a random one.
       */
      value={value}
      {...props}
    >
      <AccordionTrigger id={value}>{trigger}</AccordionTrigger>

      <AccordionContent
        ref={mergeRefs([contentRef, animationScope])}
        key={value}
        id={value}
        forceMount
      >
        {itemContent}
      </AccordionContent>
    </AccordionPrimitive.Item>
  )
})

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
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
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn('prose-default overflow-hidden text-sm', className)}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
))

const AccordionContentWithMotion = motion(AccordionContent)

export { AccordionContainer, AccordionItem }
