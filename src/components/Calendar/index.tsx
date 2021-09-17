import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import ReactCalendar from 'react-calendar';
import {useAppDispatch} from '@app/store/hooks';
import {setEndDate} from '@app/store/imagesSlice';
// import formatDate from '@app/hooks/formatDate';

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
  }
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useAppDispatch();
  console.log(selectedDate);

  useEffect(() => {
    dispatch(setEndDate(selectedDate));
  }, [selectedDate, dispatch]);

  return (
    <CalendarWrap className="bg-primary rounded-md shadow-md">
      <ReactCalendar
        onChange={setSelectedDate}
        value={selectedDate}
        maxDate={new Date()}
        minDetail="decade"
      />
    </CalendarWrap>
  );
}
