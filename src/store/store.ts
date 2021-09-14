import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import imagesReducer from '@app/store/imagesSlice';
import reactionsReducer from '@app/store/reactionsSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    reactions: reactionsReducer
    //likes: likesReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;