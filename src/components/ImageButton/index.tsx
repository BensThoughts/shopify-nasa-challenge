import { useAppDispatch } from '@app/store/hooks';
import { fetchImagesMetadata } from '@app/store/imagesSlice';

export default function ImageButton() {
  const dispatch = useAppDispatch();

  function fetchImageMeta() {
    dispatch(fetchImagesMetadata());
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