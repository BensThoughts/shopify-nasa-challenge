import { useEffect, useState } from 'react';
import { Download } from 'react-feather';

import axios from 'axios';

import AnimatedIcon from '@app/components/AnimatedIcon';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
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

  const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  const extMatch = (hdurl).match(patt1);
  const ext = extMatch?.at(1);

  useEffect(() => {
    async function downloadImage(imageSrc: string) {
      const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
      const extMatch = (imageSrc).match(patt1);
      const ext = extMatch?.at(1);
      if (ext) {
        console.log(imageSrc);
        try {
          // const response = await axios({
          //   url: imageSrc,
          //   method: 'GET',
          //   params: {
          //     api_key: API_KEY
          //   }
          // });
          // console.log(response);
          const image = await fetch(imageSrc, {
            method: 'GET',
            mode: 'no-cors'
          });
          console.log(image);
          const imageBlob = await image.blob();
          console.log(imageBlob);
          const imageUrl = URL.createObjectURL(imageBlob);
    
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = `${date}-${title}.${ext}`;
          document.body.appendChild(link);
          link.click()
          document.body.removeChild((link));
        } catch (e) {
          console.log(e);
        }
      }
      setDownloading(false);
    }
    if (downloading) {
      downloadImage(hdurl);
    }
  }, [downloading, hdurl, date, title]);

  return (
    <a href={hdurl} title={`Download ${title}`} download={`${date}-${title}.jpg`} target="_blank" rel="noreferrer noopener">
      <AnimatedIcon>
        <Download className="text-primary text-opacity-70" />
      </AnimatedIcon>
    </a>  
  );
}