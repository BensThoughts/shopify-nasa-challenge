import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GridWrapper from '../components/GridWrapper'
import ImageButton from '../components/ImageButton'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import styles from '../styles/Home.module.css'

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { fetchImagesMetadata, ImageMetadata, selectAllImageMeta } from '@app/store/imagesSlice';
import ImageCard from '@app/components/ImageCard'

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const imagesStatus = useAppSelector(state => state.images.status);
  const error = useAppSelector(state => state.images.error);
  const images = useAppSelector(selectAllImageMeta);

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(fetchImagesMetadata({start_date: '2021-02-01', end_date: '2021-02-10'}));
    }
  }, [imagesStatus, dispatch]);

  let statusText;

  if (imagesStatus === 'loading') {
    statusText = <div>Loading</div>
  } else if (imagesStatus === 'failed') {
    statusText = <div>{error}</div>
  }

  return (
    <MaxWidthWrapper>
        <div className="w-full flex flex-col items-center justify-center mb-3">
          <h1 aria-label="">Spacestagram 0.1-beta</h1>
          <div>
            <ImageButton />
            {statusText}
          </div>
        </div>

        <section aria-label="Infinite scrolling list of images">
        <GridWrapper>
          {imagesStatus === 'succeeded'
            ? images.map((imgMeta) => (
                <ImageCard
                  key={imgMeta.id}
                  title={imgMeta.title}
                  copyright={imgMeta.copyright}
                  date={imgMeta.date}
                  description={imgMeta.explanation}
                  url={imgMeta.url}
                  hdurl={imgMeta.hdurl}
                />
              ))
            : <div>spinner</div>
          }
                </GridWrapper>

        </section>
    </MaxWidthWrapper>
  );
}

export default Home
