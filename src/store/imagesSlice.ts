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


import {AppDispatch, RootState} from '@app/store/store';
import formatDate from '@app/hooks/formatDate';
import {compareAsc, parseISO, subDays} from 'date-fns';

const DATE_SPREAD = 10;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function hasMoreImages(endDate: string) {
  const eDate = parseISO(endDate);
  const cmpr = compareAsc(parseISO('1995-06-26'), eDate);

  if (cmpr >= 0) {
    return false;
  }
  return true;
}
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
  endDate: string;
  calendarDate: string;
  firstLoad: boolean;
  moreImages: boolean;
};

const imagesAdapter = createEntityAdapter<ImageMetadata>({
  selectId: (image) => image.url,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: ImageMetadataState = imagesAdapter.getInitialState({
  status: 'idle',
  error: undefined,
  endDate: formatDate(new Date()),
  calendarDate: formatDate(new Date()),
  firstLoad: true,
  moreImages: true,
});

export const fetchImagesMetadata = createAsyncThunk<
  ImageMetadataResponse[],
  void,
  {
    state: RootState,
    dispatch: AppDispatch
  }
>('images/requestStatus', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const dispatch = thunkApi.dispatch;
  const endDate = state.images.endDate;

  const startDate = formatDate(subDays(parseISO(endDate), DATE_SPREAD));

  const response = await axios.get<ImageMetadataResponse[]>(`https://api.nasa.gov/planetary/apod`, {
    params: {
      api_key: API_KEY,
      start_date: startDate,
      end_date: endDate,
    },
  });

  const newEndDate = subDays(parseISO(endDate), DATE_SPREAD);
  dispatch(setEndDate(newEndDate));

  const data = response.data;
  return data;
});

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setEndDate(state, action: PayloadAction<{date: string}>) {
      const {date} = action.payload;
      if (hasMoreImages(date)) {
        state.moreImages = true;
      } else {
        state.moreImages = false;
      }
      state.endDate = date;
    },
    resetEndDate(state, action: PayloadAction<{date: string}>) {
      const {date} = action.payload;
      imagesAdapter.removeAll(state);
      state.endDate = date;
      state.firstLoad = true;
      state.status = 'idle';
      state.calendarDate = date;

      if (hasMoreImages(date)) {
        state.moreImages = true;
      } else {
        state.moreImages = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImagesMetadata.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchImagesMetadata.fulfilled, (state, action: PayloadAction<ImageMetadataResponse[]>) => {
      state.status = 'succeeded';
      state.firstLoad = false;

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

export const selectEndDate = (state: RootState) => parseISO(state.images.endDate);
export const selectCalendarDate = (state: RootState) => parseISO(state.images.calendarDate);

export const setEndDate = createAction('images/setEndDate', function prepare(date: Date) {
  return {
    payload: {
      date: formatDate(date),
    },
  };
});

export const resetEndDate = createAction('images/resetEndDate', function prepare(date: Date) {
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
