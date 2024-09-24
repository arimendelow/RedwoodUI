import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio'

import { cn } from 'src/lib/uiUtils'

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    asChild
    ref={ref}
    className={cn('h-full w-full rounded-md object-cover', className)}
    {...props}
  />
))

export default AspectRatio
