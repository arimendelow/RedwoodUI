import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from 'src/lib/utils'

interface ISwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ISwitchProps
>(({ className, ...props }, ref) => {
  return (
    <SwitchRoot ref={ref} className={className} {...props}>
      <SwitchThumb />
    </SwitchRoot>
  )
})

interface ISwitchRootProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

const SwitchRoot = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ISwitchRootProps
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'focus-ring group mr-4 inline-flex h-6 w-10 cursor-pointer touch-none items-center rounded-full border-2 border-transparent transition duration-300 [&[data-state="checked"]]:bg-primary-700 [&[data-state="unchecked"]]:bg-neutral-300/40',
        className
      )}
      {...props}
    />
  )
})

interface ISwitchThumbProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Thumb> {}

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Thumb>,
  ISwitchThumbProps
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitive.Thumb
      ref={ref}
      className={cn(
        'block h-5 w-5 origin-right rounded-full bg-light shadow transition-all duration-200 group-active:w-6 group-active:duration-300 [&[data-state="checked"]]:ml-4 [&[data-state="checked"]]:group-active:ml-3',
        className
      )}
      {...props}
    />
  )
})

export default Switch
