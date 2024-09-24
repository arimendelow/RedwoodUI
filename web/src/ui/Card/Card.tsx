import { cn } from 'src/lib/uiUtils'

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean
}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  ({ loading, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-card text-color-primary overflow-clip rounded-md border outline-none',
        loading && 'loading',
        className
      )}
      {...props}
    />
  )
)

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  >
    {props.children}
  </h3>
))

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('prose-default text-sm', className)} {...props} />
))

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))

export default Card
export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
