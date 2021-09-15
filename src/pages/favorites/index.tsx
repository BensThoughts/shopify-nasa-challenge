import {useAppSelector} from '@app/store/hooks';
import {selectAllReactions} from '@app/store/reactionsSlice';
import {Heart} from 'react-feather';

import GridWrapper from '@app/components/GridWrapper';
import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import SmallImageCard from '@app/components/ImageCardSmall';
import Title from '@app/components/Title';

export default function FavoritesPage() {
  const reactions = useAppSelector(selectAllReactions);

  let heartedImages;

  if (reactions) {
    heartedImages = reactions.filter((img) => {
      return img.reactions.hearted;
    });
  }

  return (
    <MaxWidthWrapper>
      <section aria-label="page title" className="w-full flex flex-col items-center justify-center my-5">
        <Title>Hearted Gallery</Title>
        <div>
          <h2 className="italic md:font-light text-base sm:text-lg md:text-xl">Your favorites!</h2>
        </div>
      </section>
      <GridWrapper>
        <section aria-label="a gallery of your favorite images">
          {heartedImages && heartedImages.length > 0 ?
            <div className="flex gap-3 flex-wrap items-center justify-center mb-5">
              {heartedImages.map((img) => (
                <SmallImageCard key={img.url} title={img.title} date={img.date} url={img.url} hdurl={img.hdurl} />
              ))}
            </div> :
            <div className="text-center w-full">
              <p>Looks like you don&apos;t have any favorites.</p>
              <p>
                  Try clicking the&nbsp;<Heart style={{color: 'rgba(127, 29, 29, 0.7)', display: 'inline'}} />&nbsp;icon.
              </p>
            </div>
          }
        </section>
      </GridWrapper>
    </MaxWidthWrapper>
  );
}
