import { useAppSelector } from '@app/store/hooks';
import { selectAllReactions } from '@app/store/reactionsSlice';
import { selectImageMetaEntities } from '@app/store/imagesSlice';

import GridWrapper from '@app/components/GridWrapper';
import MaxWidthWrapper from '@app/components/MaxWidthWrapper';
import SmallImageCard from '@app/components/ImageCardSmall';

export default function FavoritesPage() {
  const reactions = useAppSelector(selectAllReactions)

  // let heartedImages;

  // if (reactions) {

  //   const hearted = reactions.filter((img) => {
  //     return img.reactions.hearted;
  //   });

  //   if (hearted.length > 0) {
  //     heartedImages = hearted.map((img) => {
  //       return images[img.url]
  //     });
  //   }
  // }

  return (
    <MaxWidthWrapper>
    <GridWrapper>
      <h1>Hearted Images</h1>
        {reactions
          ?
            <div className="flex gap-3 flex-wrap items-center justify-center">
              {reactions.map((img) => (
                 <SmallImageCard key={img!.url} title={img!.title} date={img!.date} url={img!.url} hdurl={img!.hdurl} />
              ))}
            </div>
          : <div className="w-full h-full flex items-center justify-center"><p>Looks like you don&apos;t have any favorites yet</p></div>
        }
    </GridWrapper>
    </MaxWidthWrapper>
  );
}