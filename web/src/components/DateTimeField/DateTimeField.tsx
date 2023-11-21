import DatePickerPrimitive from 'react-datepicker'
// import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

type DatePickerPrimitivePropsType = React.ComponentProps<
  typeof DatePickerPrimitive
>

interface IDateTimeFieldProps
  extends Omit<
    DatePickerPrimitivePropsType,
    'selected' | 'onChange' | 'startDate' | 'endDate'
  > {}

const DateTimeField = ({ ...props }: IDateTimeFieldProps) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  /** Used when there's a date range */
  const [endDate, setEndDate] = React.useState<Date | null>(null)
  const onDateSelectionChange: DatePickerPrimitivePropsType['onChange'] = (
    dateSelection
  ) => {
    if (Array.isArray(dateSelection)) {
      const [start, end] = dateSelection
      setStartDate(start)
      setEndDate(end)
    } else {
      setStartDate(dateSelection)
    }
  }
  return (
    <DatePickerPrimitive
      selected={startDate}
      onChange={onDateSelectionChange}
      startDate={startDate}
      endDate={endDate}
      {...props}
      // renderCustomHeader={}
      // renderDayContents={}
      // renderMonthContent={}
    />
  )
}

export default DateTimeField
