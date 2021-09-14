import { useAppDispatch } from '@app/store/hooks';
import { fetchImagesMetadata } from '@app/store/imagesSlice';

export default function ImageButton() {
  const dispatch = useAppDispatch();

  function fetchImageMeta() {
    dispatch(fetchImagesMetadata({
      start_date: '2021-03-01',
      end_date: '2021-03-29'
    }));
  }

  return (
      <button
        onClick={fetchImageMeta}
        aria-label="retrieve latest images"
        className="w-10 h-10"
      >
        Get Images
      </button>
  );
}