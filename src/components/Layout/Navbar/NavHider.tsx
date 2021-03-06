import {Fragment} from 'react';
import styled from '@emotion/styled';
import {Transition} from '@headlessui/react';

import useScrollDirection from '@app/hooks/useScrollDirection';

const NavHiderWrapper = styled.div`
  z-index: 49;
`;

type NavHiderProps = {
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

export default function NavHider({
  className,
  children,
  ...rest
}: NavHiderProps) {
  const {scrollDirection, y} = useScrollDirection();
  return (
    <NavHiderWrapper className={`fixed inset-0 h-14 max-h-14 ${className}`} {...rest}>
      <Transition
        as={Fragment}
        show={scrollDirection === 'down' && y > 350 ? false : true}
        enter="transform transition duration-200 ease-out"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transform transition duration-200 ease-in"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <div>
          {children}
        </div>
      </Transition>
    </NavHiderWrapper>

  );
}
