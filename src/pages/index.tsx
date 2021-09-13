import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GridWrapper from '../components/GridWrapper'
import ImageButton from '../components/ImageButton'
import MaxWidthWrapper from '../components/MaxWidthWrapper'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <MaxWidthWrapper>
      <GridWrapper>
        <h1>Spacestagram</h1>
        <ImageButton />
      </GridWrapper>
    </MaxWidthWrapper>
  );
}

export default Home
