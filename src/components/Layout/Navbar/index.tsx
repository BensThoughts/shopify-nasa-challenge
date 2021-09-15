import {useState} from 'react';
import styled from '@emotion/styled';
import {Menu} from 'react-feather';

import NavHider from './NavHider';
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

type NavBarProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

export default function Navbar({
  className,
  ...rest
}: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Menu" description="Try something new!">
        <div className="flex flex-col items-center justify-end content-between pt-0 w-full">
          <MenuItem
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl mt-7"
          >
              Home
          </MenuItem>
          <MenuItem
            href="/favorites"
            onClick={() => setIsOpen(false)}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl"
          >
              Favorites
          </MenuItem>
          <MenuItem
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl"
          >
              Contact
          </MenuItem>
        </div>
      </Drawer>
      <NavHider>
        <Nav {...rest} className={`bg-primary bg-opacity-70 backdrop-filter backdrop-blur-sm shadow-lg ${className}`}>
          {/* Small- Screens */}
          <div className="flex md:hidden w-full justify-end items-center mx-2">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden mr-3"
              title="Side navigation menu"
            >
              <Menu aria-label="Open side navigation panel" className="text-icon-primary" />
            </IconButton>
          </div>

          {/* Medium+ Screens */}
          <div className="hidden md:flex md:justify-end md:items-center md:w-full md:pt-0 md:mr-3">
            <MenuItem animatedLink href="/" className="mx-4">Home</MenuItem>
            <MenuItem animatedLink href="/favorites" className="mx-4">Favorites</MenuItem>
            <MenuItem animatedLink href="/contact" className="mx-4">Contact</MenuItem>
          </div>
        </Nav>
      </NavHider>
    </>
  );
};
