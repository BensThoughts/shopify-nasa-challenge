import {format} from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

export default function formatDate(date: Date) {
  return format(date, DATE_FORMAT);
}
