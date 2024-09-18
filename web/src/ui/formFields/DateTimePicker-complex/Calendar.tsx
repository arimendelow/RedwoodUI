'use client'

import React, { useMemo } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  CalendarDate,
  isToday as _isToday,
  createCalendar,
  getLocalTimeZone,
  getWeeksInMonth,
} from '@internationalized/date'
import {
  CalendarProps,
  DateValue,
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useLocale,
} from 'react-aria'
import { CalendarState, useCalendarState } from 'react-stately'

import Button from 'ui/Button'
import { cn } from 'src/lib/utils'

function Calendar(props: CalendarProps<DateValue>) {
  const prevButtonRef = React.useRef<HTMLButtonElement | null>(null)
  const nextButtonRef = React.useRef<HTMLButtonElement | null>(null)

  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })
  const {
    calendarProps,
    prevButtonProps: _prevButtonProps,
    nextButtonProps: _nextButtonProps,
    title,
  } = useCalendar(props, state)
  const { buttonProps: prevButtonProps } = useButton(
    _prevButtonProps,
    prevButtonRef
  )
  const { buttonProps: nextButtonProps } = useButton(
    _nextButtonProps,
    nextButtonRef
  )

  return (
    <div {...calendarProps} className="space-y-4">
      <div className="relative flex items-center justify-center pt-1">
        <Button
          {...prevButtonProps}
          ref={prevButtonRef}
          colorTreatment="secondary"
          className={cn(
            'absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">{title}</div>
        <Button
          {...nextButtonProps}
          ref={nextButtonRef}
          colorTreatment="secondary"
          className={cn(
            'absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
          aria-label="Next month"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}

interface CalendarGridProps {
  state: CalendarState
}

function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table
      {...gridProps}
      className={cn(gridProps.className, 'w-full border-collapse space-y-1')}
    >
      <thead {...headerProps}>
        <tr className="flex">
          {weekDays.map((day, index) => (
            <th
              className="text-muted-foreground w-9 rounded-md text-center text-[0.8rem] font-normal"
              key={index}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr className="flex w-full sm:mt-2" key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

interface CalendarCellProps {
  state: CalendarState
  date: CalendarDate
}

function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = React.useRef<HTMLButtonElement | null>(null)
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  const isToday = useMemo(() => {
    const timezone = getLocalTimeZone()
    return _isToday(date, timezone)
  }, [date])

  return (
    <td
      {...cellProps}
      className={cn(
        cellProps.className,
        '[&:has([aria-selected])]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
      )}
    >
      <Button
        {...buttonProps}
        type="button"
        colorTreatment="minimal"
        ref={ref}
        className={cn(
          buttonProps.className,
          'h-9 w-9',
          isToday ? 'bg-accent text-gray-900' : '',
          isSelected
            ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
            : '',
          isOutsideVisibleRange ? 'text-muted-foreground opacity-50' : '',
          isDisabled ? 'text-muted-foreground opacity-50' : ''
        )}
      >
        {formattedDate}
      </Button>
    </td>
  )
}

export { Calendar }
