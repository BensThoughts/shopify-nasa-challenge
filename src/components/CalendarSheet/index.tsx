// import {Calendar} from 'react-feather';
import Calendar from '@app/components/Calendar';
import React, {useEffect, useRef} from 'react';
import Sheet, {SheetRef} from 'react-modal-sheet';

export type OpenState = 'closed' | 'small' | 'full';

type CalendarIconProps = {
  isOpen: boolean,
  openState: OpenState,
  // isOpen: boolean,
  onClose: React.Dispatch<React.SetStateAction<OpenState>>,
  // setIsOpenFull: React.Dispatch<React.SetStateAction<boolean>>
  // isOpenFull: boolean
  // onOpen?(): void,
  onSnap: React.Dispatch<React.SetStateAction<OpenState>>
  style?: React.CSSProperties
}


export default function CalendarSheet({
  openState = 'closed',
  isOpen = false,
  onSnap,
  onClose,
  style = {},
}: CalendarIconProps) {
  const ref = useRef<SheetRef>();

  useEffect(() => {
    if (ref && isOpen) {
      if (ref.current) {
        switch (openState) {
          case 'closed':
            ref.current.snapTo(2);
            break;
          case 'small':
            ref.current.snapTo(1);
            break;
          case 'full':
            ref.current.snapTo(0);
        }
      }
    }
  }, [ref, openState, isOpen]);

  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => {
          onClose(openState);
        }}
        snapPoints={[440, 40, 0]}
        initialSnap={2}
        onSnap={(snapInfo) => {
          switch (snapInfo) {
            case 0:
              onSnap('full');
              break;
            case 1:
              onSnap('small');
              break;
            case 2:
              onSnap('closed');
              break;
          }
        }}
        className="lg:hidden"
        style={style}
        ref={ref}
      >
        <Sheet.Container
          style={{
            backgroundColor: 'rgba(var(--color-app-primary), 0.0)',
          }}
        >
          <div className="h-full bg-primary backdrop-filter backdrop-blur-sm bg-opacity-70">
            <Sheet.Header />
            <Sheet.Content>
              <div className="w-full h-full flex flex-col items-center">
                <div className={`rounded-sm`}>
                  <h2 className="text-center text-xl text-opacity-100 text-primary mx-2 font-normal">Select a Start Date</h2>
                  <Calendar
                    className="rounded-lg"
                    style={{
                      backgroundColor: 'rgba(var(--color-app-accent), 0.8)',
                      marginTop: '0.5rem',
                      justifyContent: 'start',
                    }}
                  />
                </div>
              </div>
            </Sheet.Content>
          </div>
        </Sheet.Container>
        {/* <Sheet.Backdrop /> */}
      </Sheet>
    </>
  );
}
