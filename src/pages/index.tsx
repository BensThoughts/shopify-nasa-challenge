import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GridWrapper from '../components/GridWrapper'
import ImageButton from '../components/ImageButton'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import styles from '../styles/Home.module.css'

import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { fetchImagesMetadata } from '@app/store/imagesSlice';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const imagesStatus = useAppSelector(state => state.images.status);
  const error = useAppSelector(state => state.images.error);

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(fetchImagesMetadata());
    }
  }, [imagesStatus, dispatch]);

  let content;

  if (imagesStatus === 'loading') {
    content = <div>Loading</div>
  } else if (imagesStatus === 'succeeded') {
    content = <div>Succeeded</div>
  } else if (imagesStatus === 'idle') {
    content = <div>{error}</div>
  }

  return (
    <MaxWidthWrapper>
      <GridWrapper>
        <h1>Spacestagram 0.1-beta</h1>
        <div>
          <ImageButton />
        </div>
        <section>
          {content}
        </section>
      </GridWrapper>
    </MaxWidthWrapper>
  );
}

export default Home
