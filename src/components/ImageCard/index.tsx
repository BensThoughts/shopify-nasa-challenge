import { useState } from 'react';
import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { useAppSelector } from '@app/store/hooks';
import { selectReactionsById } from '@app/store/reactionsSlice';

import Image from 'next/image';

import Date from '@app/components/Date';
import ImageModal from '@app/components/ImageModal';
import ReactionButtons from '@app/components/ReactionButtons';
import DetailsPanel from '@app/components/DetailsPanel';

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
  filter: ${({ blur = true }) => blur ? 'blur(20px)' : 'none'};
  transition: ${({ blur = true }) => blur ? 'none' : 'filter 0.2s ease-out'};
`;

const ImageContainer = styled(Image)`
  z-index: 3;
  height: 100%;
  width: 400px;
  object-fit: scale-down;
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
  const [blurSmall, setBlurSmall] = useState(true);
  const [blurFull, setBlurFull] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const reaction = useAppSelector(state => selectReactionsById(state, url));
  let bookmarked = false;
  let hearted = false;

  if (reaction) {
    bookmarked = reaction.reactions.bookmark;
    hearted = reaction.reactions.heart;
  }

  return (
    <>
      <ImageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
      >
        <ImageBlurContainer blur={blurFull}>
          <Image
            src={url}
            alt={title}
            width="960"
            height="960"
            placeholder="blur"
            onClick={() => setIsOpen(false)}
            onLoadingComplete={() => setBlurFull(false)}
            layout="intrinsic"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            className="object-cover"
          />
        </ImageBlurContainer>
      </ImageModal>
      <div className="p-2 flex flex-col gap-3 border-solid border-2 border-gray-500 border-opacity-60 shadow-md max-w-xl bg-gray-300">
        <div className="bg-black flex items-center">
          <button aria-label="Open image in full screen" onClick={() => setIsOpen(true)}>
            <ImageBlurContainer blur={blurSmall} className="">
              <Image
              src={url}
              alt={title}
              width="960"
              height="960"
              placeholder="blur"
              // onLoad={() => setBlurCSS(false)}
              onLoadingComplete={() => setBlurSmall(false)}
              layout="intrinsic"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(960, 960))}`}
              className="object-cover"
              />
            </ImageBlurContainer>

          </button>
        </div>
  
        <div className="flex justify-between items-center">
          <div className="font-bold flex flex-col md:ml-2">
            {title}
            <Date dateString={date} />
            {copyright && <div className="font-normal">Copyright: {copyright}</div>}
          </div>
          <div className="md:mr-2">
            <ReactionButtons url={url} date={date} hearted={hearted} bookmarked={bookmarked} />
          </div>
        </div>

        <div>
          <DetailsPanel details={description} />
        </div>

      </div>
    </>
  );
}