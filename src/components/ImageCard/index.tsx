import { useState } from 'react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { useTimeoutFn } from 'react-use';

import Image from 'next/image';

import Date from '@app/components/Date';
import useProgressiveImg from '@app/utils/hooks/useProgressiveImg';
import AnimatedPulse from '@app/components/AnimatedPulse';

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="10%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="90%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="y" from="-${h}" to="${h}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)



const Card = styled.div`
  width: 500px;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(12, 1fr);
  grid-template-columns: 1;
  position: relative;
  row-gap: 10px;
  align-items: center;
  justify-items: center;
`;

const ImageWrap = styled.div`
  width: 400px;
  height: 400px;
  grid-row: 1 / 8;

`;

const ImageBlur = styled(Image)<{
  blur: boolean
}>`
  height: 400px;
  width: 400px;
  z-index: 2;
  /* grid-area: 1 / 1 / span 3 / 1; */
  filter: ${(props) => props.blur ? 'blur(20px)' : 'none'};
  transition: ${(props) => props.blur ? 'none' : 'filter 0.2s ease-out'};
`;

const InfoBox = styled.div`
  width: 500px;
  height: 100%;
  position: relative;
  grid-row: 6 / -1;
  z-index: 1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 50px;
  /* grid-area: 8 / -1 / -1 / 1; */
  background: rgb(99, 110, 114);
`;

const TitleBox = styled.div`

`;

const DescriptionBox = styled.div`

`;

type ImageCardProps = {
  title: string;
  copyright?: string;
  date: string;
  description: string;
  url: string;
  hdurl: string;
} & HTMLAttributes<HTMLDivElement>

export default function ImageCard({
  title,
  copyright,
  date,
  url,
  hdurl,
  description,
  ...rest
}: ImageCardProps) {
  // const [loaded] = useProgressiveImg(url);
  const [blur, setBlur] = useState(true);
  // const [, , resetBlur] = useTimeoutFn(() => setBlur(false), 500);

  // if (loaded) {
  //   resetBlur();
  // }

  return (
    <Card {...rest}>
        <ImageWrap>
          <ImageBlur
            src={url}
            alt={title}
            width="400"
            height="400"
            placeholder="blur"
            onLoad={() => setBlur(false)}
            blur={blur}
            layout="responsive"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </ImageWrap>
        
        <InfoBox>
          <div className="font-bold">{title}</div>
          <div><Date dateString={date} /></div>
          <DescriptionBox>{description}</DescriptionBox>
        </InfoBox>
    </Card>
  );
}




{/* <Image src={url} alt={title} width="700" height="475" placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`} /> */}


// {blur
//   ? <AnimatedPulse />
//   : <picture>
//       <source srcSet={hdurl} media="(min-width: 740px)" />
//         <img src={url} alt={title} width="400" height="400"/>
//     </picture>
// }


// {loaded
//   ? <AnimatedPulse />
//   : <img
//      src={url}
//      alt={title}
//      width="400"
//      height="400"
//      style={{
//        filter: blur ? 'blur(20px)' : 'none',
//        transition: blur ? 'none' : 'filter 0.2s ease-out'
//      }}
//      className="object-contain"
//    />
// }