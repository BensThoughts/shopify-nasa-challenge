import { useEffect, useState } from 'react'
import type { NextPage } from 'next';
import { format, parseISO, subDays } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';

import { fetchImagesMetadata, selectAllImageMeta } from '@app/store/imagesSlice';
import GridWrapper from '../components/GridWrapper';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import ImageCard from '@app/components/ImageCard';
import LoadingSpinner from '@app/components/LoadingSpinner';

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
    statusText = <p>Loading Images</p>
  } else if(imagesStatus === 'succeeded') {
    statusText = <p>Images Loaded</p>
  } else if (imagesStatus === 'failed') {
    statusText = <p>Error: {error}</p>
  }

  return (
    <MaxWidthWrapper>
        <div className="w-full flex flex-col items-center justify-center mb-3">
          <h1 aria-label="app title" className="text-4xl">Spacestagram 0.3</h1>
          <div>
            {statusText}
          </div>
        </div>

        <section
          aria-label="Infinite scrolling list of images"
          
        >
          
            {imagesStatus === 'succeeded' || !firsLoad
              ? (<InfiniteScroll
                  dataLength={images.length}
                  next={fetchData}
                  hasMore={true}
                  style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}
                  loader={
                    <div className="flex flex-col align-center justify-center w-full">
                      <LoadingSpinner size={16} style={{ alignSelf: 'center'}} />
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
                  
                </InfiniteScroll>)
              : <div><LoadingSpinner size={40} /></div>
            }
       

        </section>
    </MaxWidthWrapper>
  );
}

export default Home
