import {useState, HTMLAttributes} from 'react';
// import styled from '@emotion/styled';
import {useAppSelector} from '@app/store/hooks';
import {selectReactionsById} from '@app/store/reactionsSlice';

// import Image from 'next/image';
import DateComponent from '@app/components/DateComponent';
import ImageModal from '@app/components/ImageModal';
import HeartButton from '@app/components/HeartButton';
import DownloadButton from '@app/components/DownloadButton';
import DetailsPanel from '@app/components/DetailsPanel';
import ImageBlurContainer from '@app/components/ImageBlurContainer';

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
  const [isOpen, setIsOpen] = useState(false);
  const reaction = useAppSelector((state) => selectReactionsById(state, url));

  let hearted = false;

  if (reaction) {
    hearted = reaction.reactions.hearted;
  }

  return (
    <>
      <ImageModal
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ImageBlurContainer src={url} title={title} size="large" blur={false} />
      </ImageModal>

      <div
        className="p-2 flex flex-col gap-3 border-solid border-2 border-secondary border-opacity-60 shadow-lg max-w-xl bg-app-bg-secondary"
        {...rest}
      >

        {/* Image */}
        <div className="bg-black flex items-center">
          <button aria-label="Open image in full screen" onClick={() => setIsOpen(true)}>
            <ImageBlurContainer src={url} title={title} size="large" blur={true} />
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
