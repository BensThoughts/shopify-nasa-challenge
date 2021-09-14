import { useState } from 'react';
import styled from '@emotion/styled';
import { Menu } from 'react-feather';

import NavHider from './NavHider';
import AnimatedLink from '@app/components/AnimatedLink';
import Drawer from '@app/components/Drawer';
import MenuItem from '@app/components/Layout/MenuItem';
import IconButton from '@app/components/IconButton';

const Nav = styled.nav`
  display: flex;
  z-index: 49;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* margin-bottom: 2rem; */
  padding: 0px;
  /* position: fixed; */
  /* top: 0px; */
  transition-property: background, color;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
  will-change: background, color;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  align-content: space-between;
  padding-top: 0px;
  background: var(--color-app-primary);
  /* transition: background 0.25s ease-in-out;
  will-change: background; */
`;

type NavBarProps = {
  className?: string;
}

export default function Navbar({ className, ...rest }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Menu" description="Try something new!">
          <NavLinks className="flex flex-col items-center justify-end content-between pt-0 w-full">
            <MenuItem href="/" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 w-full h-10 flex items-center justify-center text-xl mt-7">Home</MenuItem>
            <MenuItem href="/favorites" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 w-full h-10 flex items-center justify-center text-xl">Favorites</MenuItem>
            <MenuItem href="/contact" onClick={() => setIsOpen(false)} className="hover:bg-gray-800 w-full h-10 flex items-center justify-center text-xl">Contact</MenuItem>
          </NavLinks>
      </Drawer>
      <NavHider>
        <Nav {...rest} className={`bg-primary shadow-lg ${className}`}>
          {/* Small- Screens */}  
          <div className="flex md:hidden w-full justify-start items-center mx-3">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden mr-3"
              ariaLabel="Menu button"
            >
              <Menu className="text-icon-primary" />
            </IconButton>
          </div>
  
          {/* Medium+ Screens */}  
          <div className="hidden md:flex md:justify-between md:items-center md:w-full md:pt-0 md:mr-3">
            <NavLinks className="flex items-center justify-end content-between">
              <MenuItem animatedLink href="/" className="mx-4">Home</MenuItem>
              <MenuItem animatedLink href="/favorites" className="mx-4">Favorites</MenuItem>
              <MenuItem animatedLink href="/contact" className="mx-4">Contact</MenuItem>
            </NavLinks>
          </div>
        </Nav>        
      </NavHider>
     
    </>
  );
};
