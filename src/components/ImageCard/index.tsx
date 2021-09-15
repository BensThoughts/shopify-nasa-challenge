import { useState } from 'react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { useAppSelector } from '@app/store/hooks';
import { selectReactionsById } from '@app/store/reactionsSlice';
import { format } from 'date-fns';

import Image from 'next/image';
import DateComponent from '@app/components/DateComponent';
import ImageModal from '@app/components/ImageModal';
import HeartButton from '@app/components/HeartButton';
import DownloadButton from '@app/components/DownloadButton';
import DetailsPanel from '@app/components/DetailsPanel';
import { selectImageMetaById } from '@app/store/imagesSlice';

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

const ImageBlurContainer = styled.div<{
  blur: boolean
}>`
  height: 100%;
  display: flex;
  
  align-items: center;

  filter: ${({ blur = true }) => blur ? 'blur(20px)' : 'none'};
  transition: ${({ blur = true }) => blur ? 'none' : 'filter 0.2s ease-out'};
`;


type ImageCardProps = {
  title: string;
  copyright?: string;
  date: string;
  description: string;
  url: string;
  hdurl: string;
} & HTMLAttributes<HTMLDivElement>

const SMALL_SIZE = 576;
const LARGE_SIZE = 960;
const DATE_FORMAT = 'yyyy-MM-dd';

export default function ImageCard({
  title,
  copyright,
  date,
  url,
  hdurl,
  description,
  ...rest
}: ImageCardProps) {
  const [blurSmall, setBlurSmall] = useState(true);
  const [blurFull, setBlurFull] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const reaction = useAppSelector(state => selectReactionsById(state, url));

  let bookmarked = false;
  let hearted = false;

  if (reaction) {
    hearted = reaction.reactions.hearted;
  }

  return (
    <>
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ImageBlurContainer blur={blurFull}>
          <Image
            src={url}
            alt={title}
            width={LARGE_SIZE}
            height={LARGE_SIZE}
            placeholder="blur"
            onClick={() => setIsOpen(false)}
            onLoadingComplete={() => setBlurFull(false)}
            layout="intrinsic"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(LARGE_SIZE, LARGE_SIZE))}`}
            className="object-contain"
          />
        </ImageBlurContainer>
      </ImageModal>

      <div className="p-2 flex flex-col gap-3 border-solid border-2 border-gray-500 border-opacity-60 shadow-md max-w-xl bg-app-bg-secondary">
        
        {/* Image */}
        <div className="bg-black flex items-center">
          <button aria-label="Open image in full screen" onClick={() => setIsOpen(true)}>
            <ImageBlurContainer blur={blurSmall} className="">
              <Image
              src={url}
              alt={title}
              width={SMALL_SIZE}
              height={SMALL_SIZE}
              placeholder="blur"
              // onLoad={() => setBlurCSS(false)}
              onLoadingComplete={() => setBlurSmall(false)}
              layout="intrinsic"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(SMALL_SIZE, SMALL_SIZE))}`}
              className="object-cover" // TODO: object-cover or object-contain, which looks better?
              />
            </ImageBlurContainer>
          </button>
        </div>
  
        {/* Title, Heading, and Buttons */}
        <div className="flex justify-between items-center gap-x-4">

          <div className="font-bold flex flex-col md:ml-2">
            {title}
            <DateComponent dateString={date} />
            {copyright && <div className="font-normal">Copyright: {copyright}</div>}
          </div>

          <div className="md:mr-2 flex gap-x-2 md:gap-x-4">
            <HeartButton
              url={url}
              hdurl={hdurl}
              title={title}
              date={date}
              hearted={hearted}
            />
            <DownloadButton url={url} hdurl={hdurl} title={title} date={date} />
          </div>

        </div>

        {/* Details Panel */}
        <div>
          <DetailsPanel details={description} />
        </div>
      </div>
    </>
  );
}