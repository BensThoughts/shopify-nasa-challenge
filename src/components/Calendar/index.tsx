// import {useEffect, useState} from 'react';
// import styled from '@emotion/styled';
import ReactCalendar from 'react-calendar';
import {useAppDispatch, useAppSelector} from '@app/store/hooks';
import {resetEndDate, selectCalendarDate} from '@app/store/imagesSlice';
import {
  ArrowRight,
  ArrowLeft,
} from 'react-feather';
import {compareAsc} from 'date-fns';
// import formatDate from '@app/hooks/formatDate';

// import './calendar.module.css';
import 'react-calendar/dist/Calendar.css';
import React, {useState} from 'react';
import styled from '@emotion/styled';

const CalendarY = styled(ReactCalendar)`
  button:disabled {
    color: rgba(117, 117, 117, 0.5);
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

.react-calendar__year-view
.react-calendar__tile,
.react-calendar__decade-view
.react-calendar__tile,
.react-calendar__century-view
.react-calendar__tile {
    padding: 1.5em 0.5em;
}



`;


export default function Calendar({
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const dispatch = useAppDispatch();
  const today = new Date();
  const calendarDate = useAppSelector(selectCalendarDate);
  // Keeping state local (as well as in redux) for performance reasons
  const [selectedDate, rawSetSelectedDate] = useState(calendarDate);

  function setSelectedDate(date: Date) {
    rawSetSelectedDate(date);
    dispatch(resetEndDate(date));
  }

  return (
    <div {...rest}>
      <CalendarY
        onChange={setSelectedDate}
        value={selectedDate}
        maxDate={today}
        minDate={new Date(1995, 5, 26)}
        tileDisabled={({activeStartDate, date, view}) => compareAsc(date, today) >= 0}
        minDetail="decade"

        // navigationLabel={
        //   ({date, label, locale, view}) => `Current view: ${view}, date: ${date.toLocaleDateString(locale)}`
        // }
        nextLabel={
          <div aria-label="previous" role="button" className="flex items-center justify-center">
            <ArrowRight className="text-primary text-opacity-70 text-center" />
          </div>
        }
        prevLabel={
          <div aria-label="previous" role="button" className="flex items-center justify-center">
            <ArrowLeft className="text-primary text-opacity-70" />
          </div>
        }
        // next2Label=""
        // prev2Label=""
        nextAriaLabel="next"
        navigationAriaLabel="select a date to start the images at"
        className={`rounded-sm`}
      />
    </div>
  );
}
