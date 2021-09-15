/**
 * This component should only be used as a wrapper around an entire Next.js page
 */

import {ReactNode} from 'react';

interface MaxWidthWrapperProps {
  children: ReactNode;
}

export default function MaxWidthWrapper(props: MaxWidthWrapperProps) {
  return (
    <div className="relative px-4 md:px-8 mx-auto w-full max-w-6xl">
      {props.children}
    </div>
  );
}
