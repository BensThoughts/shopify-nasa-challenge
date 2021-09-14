import { useEffect, ReactNode, ReactChildren, useState, useMemo } from 'react'
import type { NextPage } from 'next';
import { format, parseISO, subDays, formatISO } from 'date-fns';
import Head from 'next/head'
import Image from 'next/image'
import GridWrapper from '../components/GridWrapper'
import ImageButton from '../components/ImageButton'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import styles from '../styles/Home.module.css'

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { fetchImagesMetadata, ImageMetadata, selectAllImageMeta } from '@app/store/imagesSlice';
import ImageCard from '@app/components/ImageCard'
import InfiniteScroll from 'react-infinite-scroll-component'

const DATE_FORMAT = 'yyyy-MM-dd';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const imagesStatus = useAppSelector(state => state.images.status);
  const firsLoad = useAppSelector(state => state.images.firstLoad);
  const error = useAppSelector(state => state.images.error);
  const images = useAppSelector(selectAllImageMeta);


  const today = new Date();
  const todayFormatted = format(today, DATE_FORMAT);
  const startDateFormatted = format(subDays(today, 10), DATE_FORMAT);
  const [lastDate, setLastDate] = useState(startDateFormatted);

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(fetchImagesMetadata({start_date: startDateFormatted, end_date: todayFormatted}));
    }
  }, [imagesStatus, dispatch, todayFormatted, startDateFormatted]);

  function fetchData() {
    const newStartDate = format(subDays(parseISO(lastDate), 10), DATE_FORMAT);
    const newEndDate = format(subDays(parseISO(lastDate), 1), DATE_FORMAT);
    dispatch(fetchImagesMetadata({start_date: newStartDate, end_date: newEndDate}));
    setLastDate(newStartDate);
  }

  let statusText;

  if (imagesStatus === 'loading') {
    statusText = <div>Loading Images</div>
  } else if(imagesStatus === 'succeeded') {
    statusText = <div>Images Loaded</div>
  } else if (imagesStatus === 'failed') {
    statusText = <div>Error: {error}</div>
  }

  return (
    <MaxWidthWrapper>
        <div className="w-full flex flex-col items-center justify-center mb-3">
          <h1 aria-label="app title" className="text-4xl">Spacestagram 0.2</h1>
          <div>
            {statusText}
          </div>
        </div>

        <section aria-label="Infinite scrolling list of images">
          {imagesStatus === 'succeeded' || !firsLoad
            ? <InfiniteScroll
                dataLength={images.length}
                next={fetchData}
                hasMore={true}
                loader={<h4>{statusText}</h4>}
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
                
              </InfiniteScroll>
            : <div>spinner</div>
          }
     

     

        </section>
    </MaxWidthWrapper>
  );
}

export default Home
