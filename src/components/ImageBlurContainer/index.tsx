import styled from '@emotion/styled';
import Image from 'next/image';
import {useState} from 'react';
// import {useWindowSize} from 'react-use';

const SMALL_SIZE = 576;
const LARGE_SIZE = 1080;
// const SCALE_FACTOR = 0.8;

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop stop-color="#333" offset="10%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="90%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="y" from="-${h}" to="${h}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ?
    Buffer.from(str).toString('base64') :
    window.btoa(str);

const ImageContainer = styled.div<{
  blur: boolean
}>`
  height: 100%;
  display: flex;
  
  align-items: center;

  filter: ${({blur = true}) => blur ? 'blur(20px)' : 'none'};
  transition: ${({blur = true}) => blur ? 'none' : 'filter 0.2s ease-out'};
`;

type ImageBlurContainerProps = {
  src: string,
  title: string,
  size: 'small' | 'large'
} & React.HTMLAttributes<HTMLDivElement>

export default function ImageBlurContainer({
  src,
  title,
  size,
  ...rest
}: ImageBlurContainerProps) {
  const [blur, setBlur] = useState(true);
  // const {width, height} = useWindowSize();
  // console.log(width);

  return (
    <ImageContainer blur={blur} {...rest}>
      <Image
        src={src}
        alt={title}
        width={size === 'small' ? SMALL_SIZE : LARGE_SIZE}
        height={size === 'small' ? SMALL_SIZE : LARGE_SIZE}
        placeholder="blur"
        onLoadingComplete={() => setBlur(false)}
        layout="intrinsic"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(size === 'small' ? SMALL_SIZE : LARGE_SIZE, size === 'small' ? SMALL_SIZE : LARGE_SIZE))}`}
        className={size === 'small' ? 'object-cover' : 'object-contain'} // TODO: object-cover or object-contain, which looks better?
      />
    </ImageContainer>
  );
}
