import { useAppDispatch } from '@app/store/hooks';
import { upsertReaction } from '@app/store/reactionsSlice';
import { Heart, Bookmark } from 'react-feather';

import AnimatedIcon from '../AnimatedIcon';

interface ReactionButtonProps {
  url: string;
  date: string;
  bookmarked: boolean;
  hearted: boolean;
}

export default function ReactionButtons({
  url,
  date,
  bookmarked = false,
  hearted = false
}: ReactionButtonProps) {
  const dispatch = useAppDispatch();
  
  function setHeart() {
    dispatch(upsertReaction({
      url: url,
      date: date,
      heart: !hearted,
      bookmark: bookmarked
    }));
  };

  function setBookmark() {
    dispatch(upsertReaction({
      url: url,
      date: date,
      heart: hearted,
      bookmark: !bookmarked
    }));
  }

  return (
    <div className="flex gap-x-2 md:gap-x-4">
      <button onClick={setHeart}>
        <AnimatedIcon activated={hearted}>
            <Heart
              style={{
                color: 'rgba(127, 29, 29, 0.7)',
                fill: 'rgb(153, 27, 27)',
                fillOpacity: hearted ? 1 : 0,
                transition: 'fill-opacity 150ms linear'
              }}
            />
        </AnimatedIcon>
      </button>
      <button onClick={setBookmark}>
        <AnimatedIcon activated={bookmarked}>
            <Bookmark
              style={{
                color: 'rgba(0, 0, 0, 0.7)',
                fill: 'rgb(17, 24, 39)',
                fillOpacity: bookmarked ? 1 : 0,
                transition: 'fill-opacity 150ms linear'
              }}
            />
        </AnimatedIcon>
      </button>  
    </div>
  );
}