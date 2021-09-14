import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styled from '@emotion/styled';

const ImageWrap = styled.button`
  width: screen;
  height: screen;
  /* max-width: 800px; */
  max-height: 800px;
`;

interface ImageModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ImageModal({
  title,
  description,
  isOpen = false,
  onClose,
  children
}: ImageModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={onClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-90 md:opacity-80"
            entered="opacity-90 md:opacity-80"
            leave="ease-in duration-200"
            leaveFrom="opacity-90 md:opacity-80"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black"/>
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
            <div
              onClick={onClose}
              className="inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl"
            >
              <ImageWrap
                aria-label="full screen image, click to dismiss"
                className="my-5 md:my-3 flex flex-col items-center justify-items-center justify-center w-screen"
              >
                {children}
              </ImageWrap>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}