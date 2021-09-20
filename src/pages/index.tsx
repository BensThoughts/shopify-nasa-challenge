import {useEffect} from 'react';
import type {NextPage} from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useAppDispatch, useAppSelector} from '@app/store/hooks';

import {fetchImagesMetadata, selectAllImageMeta} from '@app/store/imagesSlice';
import GridWrapper from '../components/GridWrapper';
import ImageCard from '@app/components/ImageCard';
import LoadingSpinner from '@app/components/LoadingSpinner';
import Title from '@app/components/Title';
import Calendar from '@app/components/Calendar';
import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import styled from '@emotion/styled';
// import CalendarModal from '@app/components/CalendarModal';

// import formatDate from '@app/hooks/formatDate';
const CalendarWrap = styled.div`
  display: none;
  @media (min-width: 1024px) {
    grid-column: 3;
    grid-row: 1;
    position: sticky;
    display: block;
    align-self: flex-start;
    margin-top: 0px;
    top: 150px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.85;
    /* width: 350px; */
  }
`;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const imagesStatus = useAppSelector((state) => state.images.status);
  const firsLoad = useAppSelector((state) => state.images.firstLoad);
  const moreImages = useAppSelector((state) => state.images.moreImages);
  const error = useAppSelector((state) => state.images.error);
  const images = useAppSelector(selectAllImageMeta);

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(fetchImagesMetadata());
    }
  }, [imagesStatus, dispatch]);

  function fetchData() {
    dispatch(fetchImagesMetadata());
  }

  let statusText;

  if (imagesStatus === 'loading') {
    statusText = <p>Loading Images</p>;
  } else if (imagesStatus === 'succeeded') {
    statusText = <p>Images Loaded</p>;
  } else if (imagesStatus === 'failed') {
    statusText = <p>Error: {error}</p>;
  }

  // const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      {/* <CalendarModal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <CalendarBox />
      </CalendarModal> */}

      <MaxWidthWrapper>


        <section aria-label="page title" className="w-full flex flex-col items-center justify-center my-5">
          <Title>Spacestagram</Title>
          <h2 className="italic md:font-light text-base sm:text-lg md:text-xl">The final frontier</h2>
        </section>
        <GridWrapper charWidth={65}>

          <CalendarWrap>
            <div className="flex flex-col bg-primary opacity-90 items-center justify-center w-full rounded-sm shadow-md">
              <h2 className="text-center text-lg text-opacity-90 text-black mt-2">Select a Start Date</h2>
              <Calendar style={{width: '300px', margin: '5px'}} className="opacity-80" />
            </div>
          </CalendarWrap>

          <section
            aria-label="Infinite scrolling list of images"
          >
            {imagesStatus === 'succeeded' || !firsLoad ?
              (<InfiniteScroll
                dataLength={images.length}
                next={fetchData}
                hasMore={moreImages}
                style={{display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center'}}
                endMessage={<div>No More Images</div>}
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
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
