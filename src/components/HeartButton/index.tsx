import {useAppDispatch} from '@app/store/hooks';
import {upsertReaction} from '@app/store/reactionsSlice';
import React from 'react';
import {Heart} from 'react-feather';

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
  hearted = false,
  ...rest
}: HeartButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
    // <div className="flex gap-x-2 md:gap-x-4">
    <button
      onClick={setHeart}
      title={`Add ${title} to favorites`}
      {...rest}
    >
      <AnimatedIcon aria-label={`Add ${title} to favorites`}>
        <Heart
          style={{
            color: 'rgba(153, 27, 27, 0.7)',
            fill: 'rgb(153, 27, 27)',
            fillOpacity: hearted ? 1 : 0,
            transition: 'fill-opacity 150ms linear',
          }}
        />
      </AnimatedIcon>
    </button>
    // </div>
  );
}
