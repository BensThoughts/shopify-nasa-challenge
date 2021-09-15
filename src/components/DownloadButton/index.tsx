import {Download} from 'react-feather';

import AnimatedIcon from '@app/components/AnimatedIcon';
import React from 'react';

export interface DownloadButtonProps {
  url: string;
  hdurl: string;
  title: string;
  date: string;
}

export default function DownloadButton({
  url, // TODO: Maybe a way to choose low/high res.?
  hdurl,
  title,
  date,
  ...rest
}: DownloadButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={hdurl}
      title={`Download ${title}`}
      download={`${date}-${title}.jpg`}
      target="_blank"
      rel="noreferrer noopener"
      {...rest}
    >
      <AnimatedIcon>
        <Download className="text-primary text-opacity-70" />
      </AnimatedIcon>
    </a>
  );
}
