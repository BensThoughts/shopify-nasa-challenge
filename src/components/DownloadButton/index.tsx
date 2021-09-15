import { useEffect, useState } from 'react';
import { Download } from 'react-feather';

import AnimatedIcon from '@app/components/AnimatedIcon';

interface DownloadButtonProps {
  url: string;
  hdurl: string;
  title: string;
  date: string;
}

export default function DownloadButton({
  url,  // TODO: Maybe a way to choose low/high res.?
  hdurl,
  title,
  date
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function downloadImage(imageSrc: string) {
      const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      const extMatch = (imageSrc).match(patt1);
      const ext = extMatch?.at(1);
      if (ext) {
        const image = await fetch(imageSrc, {
          mode: 'no-cors'
        });
        const imageBlob = await image.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
  
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${date}-${title}.${ext}`;
        document.body.appendChild(link);
        link.click()
        document.body.removeChild((link));
      }
      setDownloading(false);
    }
    if (downloading) {
      downloadImage(hdurl);
    }
  }, [downloading, hdurl, date, title]);

  return (
    <button onClick={() => setDownloading(true)}>
      <AnimatedIcon>
        <Download />
      </AnimatedIcon>
    </button>  
  );
}