import {Disclosure} from '@headlessui/react';
import {ChevronUp} from 'react-feather';

interface DetailsPanelProps {
  details: string;
}

export default function DetailsPanel({details}: DetailsPanelProps) {
  return (
    <Disclosure>
      {({open}) => (
        <>
          <Disclosure.Button
            title="Reveal more information on this image."
            className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-primary bg-gray-400 bg-opacity-50 hover:bg-opacity-70 "
          >
            <span>View Details</span>
            <ChevronUp
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-gray-800`}
            />
          </Disclosure.Button>
          <Disclosure.Panel
            style={{
              fontSize: '.98rem',
              lineHeight: '1.6rem',
            }}
            className="px-4 pt-4 pb-2 text-primary"
          >
            {details}
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );
}
