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

const API_KEY = process.env.API_KEY;

export const fetchImagesMetadata = createAsyncThunk('images/requestStatus', async () => {
  const response = await axios.get<ImageMetadataResponse>(`https://api.nasa.gov/planetary/apod?API_KEY=${API_KEY}`);
  // const response = await fetch(`https://api.nasa.gov/planetary/apod?API_KEY=${API_KEY}`, {
  //   method: 'GET',
  // });
  const data = response.data;
  console.log(response);
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
    builder.addCase(fetchImagesMetadata.fulfilled, (state, action: PayloadAction<ImageMetadataResponse>) => {
      state.status = 'succeeded';
      const data: ImageMetadata = {
        id: action.payload.url,
        date: action.payload.date,
        url: action.payload.url,
        hdurl: action.payload.hdurl,
        media_type: action.payload.media_type,
        title: action.payload.title
      }
      imagesAdapter.upsertOne(state, data);
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
