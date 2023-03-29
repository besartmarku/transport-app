import { DateInput } from '@mantine/dates'

type Props = {
  value: Date
  onChange(date: Date): void
}
function DatePicker({ value, onChange }: Props) {
  return (
    <DateInput
      valueFormat="DD/MM/YYYY"
      value={value}
      onChange={onChange}
      minDate={new Date()}
      classNames={{
        wrapper: 'w-[92px]',
        input:
          'border border-grey text-xs pr-0 pl-2.5 font-medium text-black focus:border-purple-light font-inter',
        calendar: ' font-inter text-sm',
        day: '-mt-0.5 mx-1 rounded-full text-black data-[outside=true]:text-grey data-[weekend=true]:text-black text-sm w-6 h-6 hover:!bg-purple-light data-[selected=true]:bg-purple-light data-[selected=true]:text-black data-[disabled=true]:!bg-transparent',
        weekday: 'font-bold text-black',
        calendarHeader: 'items-center',
        calendarHeaderControl:
          'hover:!bg-black transition-colors rounded-full bg-black text-white w-5 h-5 mx-4',
        calendarHeaderControlIcon: 'w-3.5 h-3.5',
        calendarHeaderLevel:
          'hover:bg-purple-light uppercase font-medium font-inter text-black',
      }}
      monthLabelFormat="MMM YYYY"
      popoverProps={{
        classNames: {
          dropdown: ' border border-purple-light p-4 rounded-lg z-50',
        },
      }}
    />
  )
}

export { DatePicker }
