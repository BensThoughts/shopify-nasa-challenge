import {ReactNode} from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div<{
  charWidth?: number
}>`
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 2.5rem;
  grid-template-columns: ${({charWidth = 90}) => `1fr min(${charWidth}ch, 100%) 1fr`};
  * {
    grid-column: 1 / -1;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: ${({charWidth = 90}) => `1fr min(${charWidth}ch, 100%) 1fr`};
    align-items: center;
    justify-items: center;
    row-gap: 2.5rem;
    * {
      grid-column: 2;
    }
  }
`;

type GridWrapperProps = {
  charWidth?: number,
  children: ReactNode,
} & React.HTMLAttributes<HTMLDivElement>

export default function GridWrapper({
  charWidth = 90,
  children,
  ...rest
}: GridWrapperProps) {
  return (
    <Wrapper charWidth={charWidth} {...rest}>
      {children}
    </Wrapper>
  );
}
