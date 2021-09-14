import { Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styled from '@emotion/styled';

const ImageWrap = styled.div`
  width: screen;
  max-width: 800px;
`;

interface ImageModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
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
            enterTo="opacity-80 md:opacity-40"
            entered="opacity-80 md:opacity-40"
            leave="ease-in duration-200"
            leaveFrom="opacity-80 md:opacity-40"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black"/>
          </Transition.Child>
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
            className="inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-black shadow-xl">


              <div className="p-3 flex flex-col items-center w-screen">
                <div className="">
                  <h3
                    className="text-lg mb-3 font-medium leading-6 text-gray-200"
                  >
                    {title}
                  </h3>
                  <ImageWrap tabIndex={0}>
                    {children}
                  </ImageWrap>

                </div>

              </div>
            </div>
          </Transition.Child>
        </div>
    </Dialog>
    </Transition>
  );
}