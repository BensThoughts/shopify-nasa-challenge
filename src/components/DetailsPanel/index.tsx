import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'react-feather';

interface DetailsPanelProps {
  details: string;
}

export default function DetailsPanel({ details }: DetailsPanelProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-400 bg-opacity-50 hover:bg-opacity-70 ">
            <span>View Details</span>
            <ChevronUp 
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-gray-800`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
              {details}
          </Disclosure.Panel>
  
        </>
      )}
    </Disclosure>
  );
}