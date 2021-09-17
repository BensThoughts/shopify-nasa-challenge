/**
 * This component should only be used as a wrapper around an entire Next.js page
 */

import React, {ReactNode} from 'react';

interface MaxWidthWrapperProps {
  children: ReactNode;
}

export default function MaxWidthWrapper({
  children,
  ...rest
}: MaxWidthWrapperProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="relative px-4 md:px-8 mx-auto w-full" {...rest}>
      {children}
    </div>
  );
}
