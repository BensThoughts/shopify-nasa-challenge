// import {Calendar} from 'react-feather';
import Calendar from '@app/components/Calendar';
// import {CSSProperties} from '@emotion/serialize';
// import styled from '@emotion/styled';
// import {useRef} from 'react';
import Sheet from 'react-modal-sheet';
// import React, {MutableRefObject, useEffect, useRef} from 'react';

// const StyledSheet = styled(Sheet)`
//   z-index: 0;
//   .react-modal-sheet-container {
//     z-index: 0;
//   }
//   .react-modal-sheet-header {
//     z-index: 0;
//     /* custom styles */
//   }
//   .react-modal-sheet-drag-indicator {
//     z-index: 0;
//     /* custom styles */
//   }
//   .react-modal-sheet-content {
//     z-index: 0;
//     /* custom styles */
//   }
//   .react-modal-sheet-backdrop {
//     z-index: 0;
//     /* custom styles */
//   }
// `;

type CalendarIconProps = {
  isOpen: boolean,
  onClose?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onOpen?(): void,
  style?: React.CSSProperties
}

export default function CalendarSheet({
  isOpen = false,
  onClose,
  setIsOpen,
  onOpen,
  style = {},
}: CalendarIconProps) {
  // const ref = useRef<SheetRef>();
  // const snapTo = (i: number) => ref.current?.snapTo(i);
  console.log(isOpen);
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        snapPoints={[440, 40]}
        initialSnap={1}
        // rootId="root"
        // style={{opacity: '0.5'}}
        className="lg:hidden"
        style={style}
      >
        <Sheet.Container
          style={{
            backgroundColor: 'rgba(var(--color-app-primary), 0.0)',
            // height: '475px',
          }}
        >
          <div className="h-full bg-primary backdrop-filter backdrop-blur-sm bg-opacity-70">
            <Sheet.Header
              style={{
              // backgroundColor: 'rgba(var(--color-app-primary), 1)',
              // opacity: '0.6',
              }}
            />
            <Sheet.Content>
              <div className="w-full h-full flex flex-col items-center">
                <div
                  className={`rounded-sm`}
                  // style={{width: '600px'}}
                >
                  <h2 className="text-center text-xl text-opacity-100 text-primary mx-2 font-normal">Select a Start Date</h2>
                  <Calendar
                    className="rounded-lg"
                    style={{
                      backgroundColor: 'rgba(var(--color-app-accent), 0.8)',
                      // borderColor: 'rgba(0, 0, 0, 0)',
                      marginTop: '0.5rem',
                      // width: '100%',
                      // height: '350px',
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
