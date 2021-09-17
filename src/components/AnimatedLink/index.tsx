import {forwardRef, MouseEventHandler} from 'react';
import styled from '@emotion/styled';

const A = styled.a`
  position: relative;
  padding: 0.2em 0;
  overflow: hidden;
  text-decoration: none;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: rgb(var(--color-app-secondary));
    opacity: 0;
    transform: scale(0);
    transform-origin: center;
    transition: opacity 300ms, transform 300ms;
  }

  &:hover:after {
    opacity: 1;
    transform: scale(1);
  }

`;

type AProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const AnimatedLink = forwardRef<HTMLAnchorElement, AProps>(({
  children,
  className = '',
  onClick,
  ...rest
}, ref) => {
  return (
    <A
      ref={ref}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {children}
    </A>
  );
});

AnimatedLink.displayName = 'AnimatedLink';

export default AnimatedLink;
