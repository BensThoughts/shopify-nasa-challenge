import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import Button from '@app/components/Button';

type MenuDrawerProps = {
  title?: string,
  description?: string,
  children: React.ReactNode,
  isOpen: boolean
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDrawer({
  title = '',
  description = '',
  children,
  isOpen,
  onClose,
}: MenuDrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => onClose(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="flex flex-col justify-between bg-primary z-50 w-full max-w-sm p-6 overflow-hidden text-left align-middle shadow-xl rounded-r-sm">
              <div>
                <Dialog.Title className="font-bold text-2xl md:text-4xl text-secondary">{title}</Dialog.Title>
                <Dialog.Description className="italic font-thin">{description}</Dialog.Description>
                {children}
              </div>
              <div className="self-center mt-10">
                <Button onClick={() => onClose(false)}>Close</Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
