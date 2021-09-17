import {useEffect, useState} from 'react';
import type {NextPage} from 'next';
import {subDays} from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useAppDispatch, useAppSelector} from '@app/store/hooks';

import {fetchImagesMetadata, selectAllImageMeta, selectDate} from '@app/store/imagesSlice';
import GridWrapper from '../components/GridWrapper';
import ImageCard from '@app/components/ImageCard';
import LoadingSpinner from '@app/components/LoadingSpinner';
import Title from '@app/components/Title';
import Calendar from '@app/components/Calendar';

import formatDate from '@app/hooks/formatDate';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const imagesStatus = useAppSelector((state) => state.images.status);
  const firsLoad = useAppSelector((state) => state.images.firstLoad);
  const error = useAppSelector((state) => state.images.error);
  const images = useAppSelector(selectAllImageMeta);
  const dateCutoff = useAppSelector(selectDate);
  console.log('index dateCutoff: ' + dateCutoff);

  const today = new Date();
  const [endDate, setEndDate] = useState(dateCutoff);
  const [startDate, setStartDate] = useState(subDays(today, 10));
  // const [lastDate, setLastDate] = useState(startDateFormatted);

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(fetchImagesMetadata({start_date: formatDate(startDate), end_date: formatDate(endDate)}));
    }
  }, [imagesStatus, dispatch, endDate, startDate]);

  function fetchData() {
    const newStartDate = subDays(startDate, 10);
    const newEndDate = subDays(endDate, 10);
    // const newStartDate = format(subDays(parseISO(startDateFormatted), 10), DATE_FORMAT);
    // const newEndDate = format(subDays(parseISO(endDateFormatted), 10), DATE_FORMAT);
    dispatch(fetchImagesMetadata({
      start_date: formatDate(newStartDate),
      end_date: formatDate(newEndDate),
    }));

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }

  let statusText;

  if (imagesStatus === 'loading') {
    statusText = <p>Loading Images</p>;
  } else if (imagesStatus === 'succeeded') {
    statusText = <p>Images Loaded</p>;
  } else if (imagesStatus === 'failed') {
    statusText = <p>Error: {error}</p>;
  }

  return (
    <GridWrapper charWidth={65}>
      <Calendar />
      <section aria-label="page title" className="w-full flex flex-col items-center justify-center my-5">
        <Title>Spacestagram</Title>
        <h2 className="italic md:font-light text-base sm:text-lg md:text-xl">The final frontier</h2>
      </section>

      <section
        aria-label="Infinite scrolling list of images"
      >
        {imagesStatus === 'succeeded' || !firsLoad ?
              (<InfiniteScroll
                dataLength={images.length}
                next={fetchData}
                hasMore={true}
                style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}
                loader={
                  <div className="flex flex-col align-center justify-center w-full">
                    <LoadingSpinner size={16} style={{alignSelf: 'center'}} />
                    <div style={{alignSelf: 'center'}} className="">{statusText}</div>
                  </div>
                }
              >
                <GridWrapper>
                  {images.map((imgMeta) => (
                    <ImageCard
                      key={imgMeta.url}
                      title={imgMeta.title}
                      copyright={imgMeta.copyright}
                      date={imgMeta.date}
                      description={imgMeta.explanation}
                      url={imgMeta.url}
                      hdurl={imgMeta.hdurl}
                    />
                  ))}
                </GridWrapper>

              </InfiniteScroll>) :
              <div><LoadingSpinner size={40} /></div>
        }
      </section>
    </GridWrapper>
  );
};

export default Home;
