import {format} from 'date-fns';
import {useState} from 'react';

const DATE_FORMAT = 'yyyy-MM-dd';

export function useFormattedDate(date: Date) {
  const [selectedDate, rawSetSelectedDate] = useState(format(date, DATE_FORMAT));

  function setSelectedDate(date: Date) {
    rawSetSelectedDate(format(date, DATE_FORMAT));
  }

  return [selectedDate, setSelectedDate] as const;
}
