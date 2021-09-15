import { useAppDispatch } from '@app/store/hooks';
import { upsertReaction } from '@app/store/reactionsSlice';
import { Heart } from 'react-feather';

import AnimatedIcon from '../AnimatedIcon';

interface HeartButtonProps {
  url: string;
  hdurl: string;
  title: string;
  date: string;
  hearted: boolean;
}

export default function HeartButtons({
  url,
  hdurl,
  title,
  date,
  hearted = false
}: HeartButtonProps) {
  const dispatch = useAppDispatch();

  function setHeart() {
    dispatch(upsertReaction({
      url: url,
      hdurl: hdurl,
      title: title,
      date: date,
      hearted: !hearted,
    }));
  };

  return (
    <div className="flex gap-x-2 md:gap-x-4">
      <button onClick={setHeart}>
        <AnimatedIcon>
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
    </div>
  );
}