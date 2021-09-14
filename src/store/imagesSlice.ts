import { 
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';

import { RootState } from '@app/store/store';

import axios from 'axios';

interface ImageMetadataResponse {
  copyright: string,
  date: string, //TODO: Could be Date type
  explanation: string,
  hdurl: string,
  media_type: string,
  service_version: string,
  title: string,
  url: string
};

export interface ImageMetadata {
  id: string,
  title: string
  copyright: string,
  date: string,
  explanation: string,
  url: string,
  urlLoaded: boolean,
  hdurl: string,
  hdUrlLoaded: boolean,
  media_type: string,
};

interface ImageMetadataState extends EntityState<ImageMetadata> {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const imagesAdapter = createEntityAdapter<ImageMetadata>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState: ImageMetadataState = imagesAdapter.getInitialState({
  status: 'idle',
  error: undefined
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchImagesMetadata = createAsyncThunk(
  'images/requestStatus',
  async ({
    start_date,
    end_date
  }: { start_date: string, end_date: string}) => {
  const response = await axios.get<ImageMetadataResponse[]>(`https://api.nasa.gov/planetary/apod`, {
    params: {
      api_key: API_KEY,
      start_date: start_date,
      end_date: end_date
    }
  });
  // const response = await fetch(`https://api.nasa.gov/planetary/apod?API_KEY=${API_KEY}`, {
  //   method: 'GET',
  // });
  const data = response.data;
  // console.log(response);
  return data;
});

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImageLoaded(state, action: PayloadAction<{
      imgId: string,
      hd: boolean,
      loaded: boolean
    }>) {
      const {imgId, hd, loaded} = action.payload;
      const existingImage = state.entities[imgId];
      if (existingImage && hd) {
        existingImage.hdUrlLoaded = loaded;
      } else if (existingImage && !hd) {
        existingImage.urlLoaded = loaded;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImagesMetadata.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchImagesMetadata.fulfilled, (state, action: PayloadAction<ImageMetadataResponse[]>) => {
      state.status = 'succeeded';
      // console.log(action.payload);
      const data: ImageMetadata[] = action.payload.filter(imgMeta => imgMeta.media_type === 'image').map((imgMeta) => {
        return {
          id: imgMeta.url,
          title: imgMeta.title,
          copyright: imgMeta.copyright,
          date: imgMeta.date,
          explanation: imgMeta.explanation,
          url: imgMeta.url,
          urlLoaded: false,
          hdurl: imgMeta.hdurl,
          hdUrlLoaded: false,
          media_type: imgMeta.media_type,
        }
      });
      imagesAdapter.upsertMany(state, data);
    });
    builder.addCase(fetchImagesMetadata.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const {
  setImageLoaded
} = imagesSlice.actions;

export const {
  selectAll: selectAllImageMeta,
  selectById: selectImageMetaById,
  selectIds: selectImageMetaIds
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export default imagesSlice.reducer;
