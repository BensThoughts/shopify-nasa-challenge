import {parseISO, format} from 'date-fns';
import styled from '@emotion/styled';
import React from 'react';

interface DateProps {
  dateString: string
}

const Time = styled.time`
  font-style: italic;
  font-weight: 100;
`;

export default function DateComponent({
  dateString,
  ...rest
}: DateProps & React.TimeHTMLAttributes<HTMLTimeElement>) {
  const date = parseISO(dateString);
  return (
    <Time dateTime={dateString} {...rest}>
      {format(date, 'LLLL d, yyyy')}
    </Time>
  );
};
