import { parseISO, format } from 'date-fns';
import styled from '@emotion/styled';

interface DateProps {
  dateString: string
}

const Time = styled.time`
  font-style: italic;
  font-weight: 100;
`;

export default function Date({ dateString }: DateProps) {
  const date = parseISO(dateString);
  return (
    <Time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</Time>
  );
};
