import { 
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';

import { RootState } from '@app/store/store';

type ReactionEmoji = 'heart' | 'thumbsDown';

type ReactionEmojis = {
  [key in ReactionEmoji]: boolean
}

export interface Reaction {
  // id: string;
  url: string;
  reactions: ReactionEmojis;
  date: string;
};

interface ReactionsState extends EntityState<Reaction>{};

const reactionsAdapter = createEntityAdapter<Reaction>({
  selectId: (reaction) => reaction.url,
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState: ReactionsState = reactionsAdapter.getInitialState({});

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {
    upsertReaction(state, action: PayloadAction<{
      url: string,
      heart: boolean,
      thumbsDown: boolean,
      date: string
    }>) {
      const { url, heart, thumbsDown, date } = action.payload;
      const newReaction: Reaction = {
        // id: url,
        url: url,
        date: date,
        reactions: {
          heart: heart,
          thumbsDown: thumbsDown
        }
      }
      reactionsAdapter.upsertOne(state, newReaction);
    },
    setReaction(state, action: PayloadAction<{
      reactionId: string,
      reaction: ReactionEmoji,
    }>) {
      const { reactionId, reaction } = action.payload;
      const existingReaction = state.entities[reactionId];
      if (existingReaction) {
        const currentReaction = existingReaction.reactions[reaction];
        existingReaction.reactions[reaction] = !currentReaction;
      } 
    },
  }
});

export const {
  upsertReaction,
  setReaction
} = reactionsSlice.actions;

export const {
  selectAll: selectAllReactions,
  selectById: selectReactionsById,
} = reactionsAdapter.getSelectors((state: RootState) => state.reactions);

export default reactionsSlice.reducer;