import React, { useRef, useState } from 'react'

import { CalendarIcon } from '@heroicons/react/20/solid'
import {
  AriaDialogProps,
  CalendarProps,
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from 'react-aria'
import {
  DatePickerState,
  DatePickerStateOptions,
  useDatePickerState,
} from 'react-stately'

import Button from 'src/components/Button'
import {
  PopoverRoot,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/Popover'
import { useForwardedRef } from 'src/lib/utils'
import { cn } from 'src/lib/utils'

import { Calendar } from './Calendar'
import { DateField } from './DateField'
import { TimeField } from './TimeField'

interface IDateTimePickerContent {
  dialogProps: AriaDialogProps
  calendarProps: CalendarProps<DateValue>
  state: DatePickerState
}

const DateTimePickerContent = ({
  dialogProps,
  calendarProps,
  state,
}: IDateTimePickerContent) => (
  <div {...dialogProps} className="space-y-3">
    <Calendar {...calendarProps} />
    {!!state.hasTime && (
      <TimeField
        aria-label="Time field"
        value={state.timeValue}
        onChange={state.setTimeValue}
      />
    )}
  </div>
)

interface IDateTimePickerProps extends DatePickerStateOptions<DateValue> {
  inline?: boolean
}

const DateTimePicker = React.forwardRef<HTMLDivElement, IDateTimePickerProps>(
  ({ inline, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)

    const state = useDatePickerState(props)
    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
    } = useDatePicker(props, state, ref)
    const { buttonProps } = useButton(_buttonProps, buttonRef)
    useInteractOutside({
      ref: contentRef,
      onInteractOutside: (_e) => {
        setOpen(false)
      },
    })

    if (inline) {
      return (
        <DateTimePickerContent
          aria-label="Date and time picker"
          dialogProps={dialogProps}
          calendarProps={calendarProps}
          state={state}
        />
      )
    } else {
      return (
        <div
          {...groupProps}
          ref={ref}
          className={cn(
            groupProps.className,
            'focus-ring flex items-center rounded-md' // might need to switch focus-ring to something with focus-within
          )}
        >
          <DateField {...fieldProps} />
          <PopoverRoot open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                {...buttonProps}
                colorTreatment="secondary"
                className="rounded-l-none"
                disabled={props.isDisabled}
                onClick={() => setOpen(true)}
              >
                <CalendarIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent ref={contentRef} className="w-full">
              <DateTimePickerContent
                dialogProps={dialogProps}
                calendarProps={calendarProps}
                state={state}
              />
            </PopoverContent>
          </PopoverRoot>
        </div>
      )
    }
  }
)

export default DateTimePicker
