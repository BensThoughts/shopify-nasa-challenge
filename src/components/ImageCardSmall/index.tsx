import {useState, HTMLAttributes} from 'react';
import styled from '@emotion/styled';

import DateComponent from '@app/components/DateComponent';
import ImageModal from '@app/components/ImageModal';
import DownloadButton from '@app/components/DownloadButton';
import ImageBlurContainer from '@app/components/ImageBlurContainer';


const CardContainer = styled.div`
  max-width: 20rem;
  max-height: 25rem;
  @media (min-width: 768px) {
    max-width: 15rem;
    max-height: 20rem;
  }
`;

type ImageCardProps = {
  title: string;
  date: string;
  url: string;
  hdurl: string;
} & HTMLAttributes<HTMLDivElement>

// const SMALL_SIZE = 300;
// const LARGE_SIZE = 960;

export default function ImageCard({
  title,
  date,
  url,
  hdurl,
  ...rest
}: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ImageModal
        title={title}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ImageBlurContainer src={url} title={title} size="large" />
      </ImageModal>

      <CardContainer
        className="p-2 flex flex-col gap-3 border-solid border-2 border-secondary border-opacity-60 shadow-md max-w-xs bg-app-bg-secondary"
        {...rest}
      >

        {/* Image */}
        <div className="bg-black flex items-center">
          <button aria-label="Open image in full screen" onClick={() => setIsOpen(true)}>
            <ImageBlurContainer src={url} title={title} size="small" />
          </button>
        </div>

        {/* Title, Heading, and Buttons */}
        <div className="flex justify-between items-center gap-x-4">

          {/* <div className="font-bold flex flex-col md:ml-2">
            {title} */}
          <DateComponent dateString={date} />
          {/* {copyright && <div className="font-normal">Copyright: {copyright}</div>}
          </div>*/}

          <div className="md:mr-2">
            <DownloadButton title={title} url={url} hdurl={hdurl} date={date} />
          </div>

        </div>

        {/* Details Panel */}
        {/* <div>
          <DetailsPanel details={description} />
        </div> */}
      </CardContainer>
    </>
  );
}
