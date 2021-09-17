import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import ReactCalendar from 'react-calendar';
import {useAppDispatch} from '@app/store/hooks';
import {resetEndDate} from '@app/store/imagesSlice';
import {
  ArrowRight,
  ArrowLeft,
} from 'react-feather';
import {compareAsc} from 'date-fns';
// import formatDate from '@app/hooks/formatDate';

// import './calendar.module.css';
import 'react-calendar/dist/Calendar.css';

const CalendarWrap = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  background-color: rgba(var(--color-app-primary), 0.4);
  /* width: 4rem;
  height: 4rem; */
  z-index: 99;
  @media (min-width: 1024px) {
    grid-column: 3;
    grid-row: 2;
    position: sticky;
    display: block;
    align-self: flex-start;
    margin-top: 0px;
    top: 150px;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
  }
`;

const MyCalendar = styled(ReactCalendar)`

`;

export default function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetEndDate(selectedDate));
  }, [selectedDate, dispatch]);


  return (
    <CalendarWrap className="">
      <MyCalendar
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
          <div className="flex items-center justify-center">
            <ArrowRight className="text-primary text-opacity-70 text-center" />
          </div>
        }
        prevLabel={
          <div className="flex items-center justify-center">
            <ArrowLeft className="text-primary text-opacity-70" />
          </div>
        }
        // next2Label=""
        // prev2Label=""
        nextAriaLabel="next"
        navigationAriaLabel="select a date to start the images at"
        className={`shadow-md`}
      />
    </CalendarWrap>
  );
}
