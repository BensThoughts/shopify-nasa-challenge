import {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Calendar, Menu} from 'react-feather';
import {useRouter} from 'next/dist/client/router';

import NavHider from './NavHider';
import MenuDrawer from '@app/components/MenuDrawer';
import MenuItem from '@app/components/Layout/MenuItem';
import IconButton from '@app/components/IconButton';
import CalendarSheet, {OpenState} from '@app/components/CalendarSheet';

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
  const [isMenuOpen, setMenuIsOpen] = useState(false);
  const [openState, setOpenState] = useState<OpenState>('closed');
  const [prevOpenState, setPrevOpenState] = useState<OpenState>('closed');
  const [isSheetOpen, setSheetOpen] = useState(false);

  const [showCalendarButton, setShowCalendarButton] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router) {
      const route = router.asPath;
      if (route != '/') {
        setShowCalendarButton(false);
      } else {
        setShowCalendarButton(true);
      }
    }
  }, [router]);


  return (
    <>

      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => {
          setMenuIsOpen(false);
          setOpenState(prevOpenState);
          // setSheetIsOpenFull(false);
        }}
        title="Menu"
        description="Explore Space!"
      >
        <div className="flex flex-col items-center justify-end content-between pt-0 w-full">
          <MenuItem
            href="/"
            onClick={() => {
              setMenuIsOpen(false);
              setSheetOpen(false);
            }}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl mt-7"
          >
              Home
          </MenuItem>
          <MenuItem
            href="/favorites"
            onClick={() => {
              setSheetOpen(false);
              setMenuIsOpen(false);
            }}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl"
          >
              Favorites
          </MenuItem>
          <MenuItem
            href="/contact"
            onClick={() => {
              setSheetOpen(false);
              setMenuIsOpen(false);
            }}
            className="hover:bg-secondary text-primary-dark w-full h-10 flex items-center justify-center text-xl"
          >
              Contact
          </MenuItem>
        </div>
      </MenuDrawer>

      <CalendarSheet
        isOpen={isSheetOpen}
        onClose={(state) => {
          if (!isMenuOpen && openState === 'full') {
            setOpenState('small');
          }
        }}
        openState={openState}
        onSnap={(state) => setOpenState(state)}
      />

      <NavHider>
        <Nav {...rest} className={`bg-primary bg-opacity-70 backdrop-filter backdrop-blur-sm shadow-lg ${className}`}>
          {/* Small- Screens */}
          <div className="flex lg:hidden w-full justify-between items-center mx-2">
            {showCalendarButton &&
              <IconButton
                onClick={() => {
                  setSheetOpen(true);
                  switch (openState) {
                    case 'closed':
                      setOpenState('full');
                      break;
                    case 'full':
                      setOpenState('small');
                      break;
                    case 'small':
                      setOpenState('closed');
                      break;
                  }
                }}
                title="Calendar sheet"
                className="lg:hidden ml-3"
              >
                <Calendar aria-label="Open calendar date picker" className="text-icon-primary" />
              </IconButton>
            }
            <div></div>
            <IconButton
              onClick={() => {
                setPrevOpenState(openState);
                setOpenState('closed');
                setMenuIsOpen(!isMenuOpen);
              }}
              className="lg:hidden mr-3"
              title="Side navigation menu"
            >
              <Menu aria-label="Open side navigation panel" className="text-icon-primary" />
            </IconButton>
          </div>

          {/* Medium+ Screens */}
          <div className="hidden lg:flex lg:justify-end lg:items-center lg:w-full lg:pt-0 lg:mr-3">
            <MenuItem animatedLink href="/" className="mx-4">Home</MenuItem>
            <MenuItem animatedLink href="/favorites" className="mx-4">Favorites</MenuItem>
            <MenuItem animatedLink href="/contact" className="mx-4">Contact</MenuItem>
          </div>
        </Nav>
      </NavHider>
    </>
  );
};
