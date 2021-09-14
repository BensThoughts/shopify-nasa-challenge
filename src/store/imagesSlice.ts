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
  copyright: string,
  date: string,
  url: string,
  hdurl: string,
  media_type: string,
  title: string
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
          copyright: imgMeta.copyright,
          date: imgMeta.date,
          url: imgMeta.url,
          hdurl: imgMeta.hdurl,
          media_type: imgMeta.media_type,
          title: imgMeta.title
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
  selectAll: selectAllImageMeta,
  selectById: selectImageMetaById,
  selectIds: selectImageMetaIds
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export default imagesSlice.reducer;
