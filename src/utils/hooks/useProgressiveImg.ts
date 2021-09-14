import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import { selectImageMetaById, setImageLoaded } from '@app/store/imagesSlice';

export default function useProgressiveImg(url: string) {
  const [blur, setBlur] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setBlur(false);
    }
  }, [url])

  return [blur] as const;
}