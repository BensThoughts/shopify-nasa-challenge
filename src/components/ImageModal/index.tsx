import {Fragment, ReactNode} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import styled from '@emotion/styled';

const ImageWrap = styled.div`
  width: 100vw;
  height: 65vh;
  max-height: 65vh;
  @media (min-width: 1024px) {
    height: calc(100vh - 200px);
    max-height: calc(100vh - 200px);
  }
  /* max-width: 800px; */
  /* max-height: 800px;
  @media (min-width: 1280px) {
    max-height:  calc(100vh - 200px);
  } */
`;

interface ImageModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ImageModal({
  title,
  isOpen = false,
  onClose,
  children,
}: ImageModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto cursor-default"
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-75 md:opacity-75"
            entered="opacity-75 md:opacity-75"
            leave="ease-in duration-200"
            leaveFrom="opacity-75 md:opacity-75"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay title="click to close image" className="fixed inset-0 bg-black"/>
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <button
              onClick={onClose}
              title="click to close image"
              className="inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl cursor-default"
            >
              <ImageWrap
                aria-label={`Full screen image of ${title}`}
                className="my-5 md:my-3 flex items-center justify-center w-full"
              >
                {children}
              </ImageWrap>
            </button>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
