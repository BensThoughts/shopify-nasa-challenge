import { useState } from 'react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';


import Image from 'next/image';

import Date from '@app/components/Date';
import ImageModal from '@app/components/ImageModal';

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

const ImageBlur = styled(Image)<{
  blur: boolean
}>`
  /* height: 400px; */
  /* width: 400px; */
  z-index: 3;
  height: 100%;
  width: 400px;
  object-fit: scale-down;
  /* grid-area: 1 / 1 / span 3 / 1; */
  filter: ${(props) => props.blur ? 'blur(20px)' : 'none'};
  transition: ${(props) => props.blur ? 'none' : 'filter 0.2s ease-out'};
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
  const [blur, setBlur] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      >
        <Image
          src={url}
          alt={title}
          width="960"
          height="960"
          placeholder="blur"
          onClick={() => setIsOpen(false)}
          
          layout="intrinsic"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
      </ImageModal>
      <div className="p-2 flex flex-col border-solid border-2 border-gray-500 border-opacity-60 shadow-md max-w-xl bg-gray-300">
        <div className="bg-black">
          <button aria-label="Open image in full screen" onClick={() => setIsOpen(true)}>
            <ImageBlur
            src={url}
            alt={title}
            width="960"
            height="960"
            placeholder="blur"
            onLoad={() => setBlur(false)}
            blur={blur}
            layout="intrinsic"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            />
          </button>
        </div>
  
        <div className="font-bold">
          {title}
        </div>
        <div className="flex">
          <Date dateString={date} />
        </div>
        <div>{copyright}</div>
      </div>
    </>
  );
}