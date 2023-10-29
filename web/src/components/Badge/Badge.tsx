import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const badgeColorTreatments = {
  neutral: 'bg-neutral-100 text-neutral-600',
  primary: 'bg-primary-100 text-primary-700',
  red: 'bg-red-100 text-red-700',
  orange: 'bg-orange-100 text-orange-700',
  amber: 'bg-amber-100 text-amber-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  lime: 'bg-lime-100 text-lime-700',
  green: 'bg-green-100 text-green-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  teal: 'bg-teal-100 text-teal-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  sky: 'bg-sky-100 text-sky-700',
  blue: 'bg-blue-100 text-blue-700',
  indigo: 'bg-indigo-100 text-indigo-700',
  violet: 'bg-violet-100 text-violet-700',
  purple: 'bg-purple-100 text-purple-700',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-700',
  pink: 'bg-pink-100 text-pink-700',
  rose: 'bg-rose-100 text-rose-700',
  loading: 'loading',
}

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      colorTreatment: badgeColorTreatments,
    },
    defaultVariants: {
      colorTreatment: 'neutral',
    },
  }
)

export interface IBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, colorTreatment, ...props }: IBadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ colorTreatment }), className)}
      {...props}
    />
  )
}

export default Badge
export { badgeVariants, badgeColorTreatments }
