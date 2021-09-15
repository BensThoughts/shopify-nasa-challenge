import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '@app/store/hooks';
import { selectAllReactions } from '@app/store/reactionsSlice';
import { selectImageMetaEntities } from '@app/store/imagesSlice';

import GridWrapper from '@app/components/GridWrapper';
import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import SmallImageCard from '@app/components/ImageCardSmall';

export default function FavoritesPage() {
  const reactions = useAppSelector(selectAllReactions)
  const images = useAppSelector(selectImageMetaEntities);

  let emptyContent = <div className="w-full h-full flex items-center justify-center"><p>Looks like you don&apos;t have any favorites yet</p></div>
  let heartedImages;
  let bookmarkedImages;

  if (reactions && images) {

    const hearted = reactions.filter((img) => {
      return img.reactions.hearted;
    });
    const bookmarked = reactions.filter((img) => {
      return img.reactions.bookmarked;
    });

    // console.log(hearted);
    // console.log(bookmarked);

    if (hearted.length > 0) {
      heartedImages = hearted.map((img) => {
        return images[img.url]
      });
      // heartedImageCards = heartedImages.map((img) => {
      //     if (img) {
      //       return  <ImageCard key={img.url} title={img.title} date={img.date} copyright={img.copyright} description={img.explanation} url={img.url} hdurl={img.hdurl} />
      //     }
      // });
    }

    if (bookmarked.length > 0) {
      bookmarkedImages = bookmarked.map((img) => {
        return images[img.url]
      });

      // bookmarkedImageCards = bookmarkedImages.map((img) => {
      //   if (img) {
      //     return  <ImageCard key={img.url} title={img.title} date={img.date} copyright={img.copyright} description={img.explanation} url={img.url} hdurl={img.hdurl} />
      //   }
      // });
    }
  }

  // console.log(heartedImageCards);
  // console.log(bookmarkedImageCards);

  return (
    <MaxWidthWrapper>
    <GridWrapper>
      <h1>Hearted Images</h1>
        {heartedImages
          ?
            <div className="flex gap-3 flex-wrap items-center justify-center">
              {heartedImages.map((img) => (
                 <SmallImageCard key={img!.url} title={img!.title} date={img!.date} copyright={img!.copyright} description={img!.explanation} url={img!.url} hdurl={img!.hdurl} />
              ))}
            </div>
          : <div>Sorry No Images Are Hearted.</div>
        }
      <h1>Bookmarked Images</h1>
      {bookmarkedImages
        ?
          <div>
            {bookmarkedImages.map((img) => (
               <SmallImageCard key={img!.url} title={img!.title} date={img!.date} copyright={img!.copyright} description={img!.explanation} url={img!.url} hdurl={img!.hdurl} />
            ))}
          </div>
        : <div>Sorry No Images Are Bookmarked.</div>
      }
    </GridWrapper>
    </MaxWidthWrapper>
  );
}