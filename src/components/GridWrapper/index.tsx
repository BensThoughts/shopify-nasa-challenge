import { ReactNode } from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div<{
  charWidth?: number
}>`
  display: grid;
  align-items: center;
  row-gap: 3rem;
  grid-template-columns: ${({ charWidth = 90 }) => `1fr min(${charWidth}ch, 100%) 1fr`};
  * {
    grid-column: 1 / -1;
  }
  @media (min-width: 768px) {
    * {
      grid-column: 2;
    }
  }
`;

type GridWrapperProps = {
  charWidth?: number,
  className?: string,
  children: ReactNode,
}

export default function GridWrapper({
  charWidth = 90,
  className,
  children
}: GridWrapperProps) {
  return (
    <Wrapper charWidth={charWidth} className={className}>
      {children}
    </Wrapper>
  )
}