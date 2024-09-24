import * as ProgressPrimitive from '@radix-ui/react-progress'
import type {
  ProgressProps as IProgressRootProps,
  ProgressIndicatorProps as IProgressIndicatorProps,
} from '@radix-ui/react-progress'
import { motion } from 'framer-motion'

import { cn } from 'src/lib/uiUtils'

interface IProgressProps extends IProgressRootProps {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  IProgressProps
>(({ value, max = 100, ...props }, ref) => (
  <ProgressRoot ref={ref} value={value} max={max} {...props}>
    <ProgressIndicator asChild>
      <motion.div
        /**
         * This looks intimidating but is just 100% minus the current %.
         * For example, when the bar is 0% complete we animate this to translateX(-100%),
         * or off the ProgressRoot to the left. As the percentage goes up, we move it towards
         * translateX(0%).
         * It's negative because we want to move it RTL, rather than the default LTR.
         * If you're still confused, the best way to understand this is inspect element and then
         * watch how this div moves according to the current value.
         */
        animate={{ translateX: `-${100 - ((value || 0) / max) * 100}%` }}
        initial={{
          translateX: '-100%',
        }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      />
    </ProgressIndicator>
  </ProgressRoot>
))

const ProgressRoot = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  IProgressRootProps
>(({ className, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-dark/20 dark:bg-light/20',
      className
    )}
    {...props}
  />
))

const ProgressIndicator = ({
  className,
  ...props
}: IProgressIndicatorProps) => (
  <ProgressPrimitive.Indicator
    className={cn('h-full w-full bg-primary-700', className)}
    {...props}
  />
)

export default Progress
export { ProgressRoot, ProgressIndicator }
