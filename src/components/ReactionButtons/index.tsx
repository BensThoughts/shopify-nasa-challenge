import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { selectReactionsById, setReaction, upsertReaction } from '@app/store/reactionsSlice';
import { Heart, Bookmark } from 'react-feather';
import styled from '@emotion/styled';

import AnimatedIcon from '../AnimatedIcon';

const StyledHeart = styled(Heart)<{
  heart: boolean
}>`
  /* width: ${props => props.heart ? '30px' : '24px'};
  height: ${props => props.heart ? '30px' : '24px'};
  object-fit: fill; */
  color: rgba(127, 29, 29, 0.7);
  fill: rgb(153, 27, 27);
  fill-opacity: ${props => props.heart ? '1' : '0'};
  transition: fill-opacity 150ms linear;

`;

const StyledBookmark = styled(Bookmark)<{
  bookmark: boolean
}>`
  color: rgba(0, 0, 0, 0.7);
  fill: rgb(17, 24, 39);
  fill-opacity: ${props => props.bookmark ? '1' : '0'};
  transition: fill-opacity 150ms linear;
`;

interface ReactionButtonProps {
  url: string;
  date: string;
  bookmarked: boolean;
  hearted: boolean;
}

export default function ReactionButtons({
  url,
  date,
  bookmarked,
  hearted
}: ReactionButtonProps) {
  const [bookmark, rawSetBookmark] = useState(bookmarked);
  const [heart, rawSetHeart] = useState(hearted);
  const dispatch = useAppDispatch();

  
  function setHeart() {
    dispatch(upsertReaction({
      url: url,
      date: date,
      heart: !heart,
      bookmark: bookmark
    }));
    rawSetHeart(!heart);
  };

  function setBookmark() {
    dispatch(upsertReaction({
      url: url,
      date: date,
      heart: heart,
      bookmark: !bookmark
    }));
    rawSetBookmark(!bookmark);
  }




  return (
    <div className="flex gap-x-2 md:gap-x-4">
      <button onClick={setHeart}>
        <AnimatedIcon activated={heart} className=""><StyledHeart heart={heart} /></AnimatedIcon>
      </button>
      <button onClick={setBookmark}>
        <AnimatedIcon activated={bookmark} className=""><StyledBookmark bookmark={bookmark} className="" /></AnimatedIcon>
      </button>  
    </div>
  );
}