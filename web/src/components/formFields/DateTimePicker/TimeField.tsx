import { useRef } from 'react'

import {
  AriaTimeFieldProps,
  TimeValue,
  useLocale,
  useTimeField,
} from 'react-aria'
import { useTimeFieldState } from 'react-stately'

import { cn } from 'src/lib/utils'

import { DateSegment } from './DateSegment'

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = useRef<HTMLDivElement | null>(null)

  const { locale } = useLocale()
  const state = useTimeFieldState({
    ...props,
    locale,
  })
  const {
    fieldProps: { ...fieldProps },
    labelProps,
  } = useTimeField(props, state, ref)

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'focus-ring inline-flex h-10 w-full flex-1 rounded-md border border-neutral-400 bg-transparent px-3 py-2 text-sm',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : ''
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

export { TimeField }
