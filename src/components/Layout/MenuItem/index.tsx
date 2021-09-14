import { MouseEventHandler, ReactNode } from 'react';
import Link from 'next/link';
import AnimatedLink from '@app/components/AnimatedLink';

type MenuItemsProps = {
  href: string,
  animatedLink?: boolean,
  className?: string,
  onClick?: MouseEventHandler<HTMLAnchorElement>
  children: ReactNode,
}

const MenuItem = ({
  href = '/',
  animatedLink = false,
  className = '',
  onClick,
  children,
  ...rest
}: MenuItemsProps) => {
  return (
    <Link passHref href={href} {...rest} scroll={false}>
      {animatedLink
        ?   <AnimatedLink href={href} className={className}>
              {children}
            </AnimatedLink>

        : <a href={href} onClick={onClick} className={`text-primary ${className}`}>
            {children}
          </a>
      }
    </Link>
  );
};

export default MenuItem;