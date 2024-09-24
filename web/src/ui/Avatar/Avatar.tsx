import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from 'src/lib/uiUtils'

interface IAvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src: string
  alt: string
  fallback: string
  /**
   * A callback providing information about the loading status of the image.
   * This is useful in case you want to control more precisely what to render as the image is loading.
   */
  onLoadingStatusChange?: (status: AvatarPrimitive.ImageLoadingStatus) => void
  /**
   * Useful for delaying rendering so it only appears for those with slower connections.
   */
  fallbackDelayMs?: number
}
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  IAvatarProps
>(
  (
    {
      src,
      alt,
      fallback,
      onLoadingStatusChange,
      fallbackDelayMs,
      className,
      ...props
    },
    ref
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700',
        className
      )}
      {...props}
    >
      <AvatarPrimitive.Image
        className="h-full w-full border-inherit object-cover"
        src={src}
        alt={alt}
        onLoadingStatusChange={onLoadingStatusChange}
      />
      <AvatarPrimitive.Fallback
        className="text-color-primary flex h-full w-full items-center justify-center border-inherit font-semibold text-opacity-80 "
        delayMs={fallbackDelayMs}
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
)

export default Avatar
