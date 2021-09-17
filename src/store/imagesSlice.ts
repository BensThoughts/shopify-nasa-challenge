/* eslint-disable camelcase */
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  createAction,
} from '@reduxjs/toolkit';
import axios from 'axios';


import {RootState} from '@app/store/store';
import formatDate from '@app/hooks/formatDate';
import {parseISO} from 'date-fns';


interface ImageMetadataResponse {
  copyright: string,
  date: string, // TODO: Could be Date type
  explanation: string,
  hdurl: string,
  media_type: string,
  service_version: string,
  title: string,
  url: string
};

export interface ImageMetadata {
  // id: string,
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
  dateCutoff: string;
  firstLoad: boolean;
};

const imagesAdapter = createEntityAdapter<ImageMetadata>({
  selectId: (image) => image.url,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: ImageMetadataState = imagesAdapter.getInitialState({
  status: 'idle',
  error: undefined,
  dateCutoff: formatDate(new Date),
  firstLoad: false,
});

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface fetchImagesArgs {
  start_date: string,
  end_date: string,
}

export const fetchImagesMetadata = createAsyncThunk<
  ImageMetadataResponse[],
  fetchImagesArgs,
  {
    state: RootState
  }
>('images/requestStatus', async (date, thunkApi) => {
  const {start_date, end_date} = date;
  // console.log('THUNK DATE: ' + thunkApi.getState().images.dateCutoff);
  // const startDate = thunkApi.getState().images.startDate;
  const response = await axios.get<ImageMetadataResponse[]>(`https://api.nasa.gov/planetary/apod`, {
    params: {
      api_key: API_KEY,
      start_date: start_date,
      end_date: end_date,
    },
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
    setEndDate(state, action: PayloadAction<{date: string}>) {
      const {date} = action.payload;
      imagesAdapter.removeAll(state);
      state.dateCutoff = date;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImagesMetadata.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchImagesMetadata.fulfilled, (state, action: PayloadAction<ImageMetadataResponse[]>) => {
      state.status = 'succeeded';
      state.firstLoad = false;
      // console.log(action.payload);
      const data: ImageMetadata[] = action.payload.filter((imgMeta) => imgMeta.media_type === 'image').map((imgMeta) => {
        return {
          // id: imgMeta.url,
          title: imgMeta.title,
          copyright: imgMeta.copyright,
          date: imgMeta.date,
          explanation: imgMeta.explanation,
          url: imgMeta.url,
          urlLoaded: false,
          hdurl: imgMeta.hdurl,
          hdUrlLoaded: false,
          media_type: imgMeta.media_type,
        };
      });
      imagesAdapter.upsertMany(state, data);
    });
    builder.addCase(fetchImagesMetadata.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// export const {
//   setEndDate,
// } = imagesSlice.actions;

export const selectDate = (state: RootState) => parseISO(state.images.dateCutoff);

export const setEndDate = createAction('images/setEndDate', function prepare(date: Date) {
  console.log('Action Date: ' + date);
  return {
    payload: {
      date: formatDate(date),
    },
  };
});

export const {
  selectAll: selectAllImageMeta,
  selectById: selectImageMetaById,
  selectEntities: selectImageMetaEntities,
  selectIds: selectImageMetaIds,
} = imagesAdapter.getSelectors((state: RootState) => state.images);

export default imagesSlice.reducer;
