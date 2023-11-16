import { createSlice } from '@reduxjs/toolkit';

import { guessNotIncludedInQuotes, isDuplicate, isString } from '../utlis';
import { QuoteResponse } from './api';

interface InitialState {
  quote: string;
  quoteData: QuoteResponse;
  guess: string;
  misses: number;
  missedChars: string[];
  time: {
    start: number;
    finish: number;
  };
  isFail: boolean;
}

const initialState: InitialState = {
  quote: '',
  quoteData: {
    _id: '',
    content: '',
    author: '',
    tags: [],
    authorSlug: '',
    length: 0,
    dateAdded: '',
    dateModified: '',
  },
  guess: '',
  misses: 0,
  missedChars: [],
  time: { start: 0, finish: 0 },
  isFail: false,
};

const mainScreenSlice = createSlice({
  name: 'mainScreen',
  initialState,
  reducers: {
    setQuote: (state, { payload }) => {
      state.quote = payload;
    },
    setQuoteData: (state, { payload }) => {
      state.quoteData = payload;
    },
    setGuess: (state, { payload }) => {
      const shouldAddToGuess = !isString(payload) || isDuplicate(state.guess, payload);

      if (shouldAddToGuess) return;

      const { isIncluded, guess } = guessNotIncludedInQuotes({ guess: payload, quote: state.quote });
      if (isIncluded) {
        state.misses = state.misses + 1;
        state.missedChars.push(guess);
      }

      state.guess = state.guess + payload.toUpperCase();
    },
    reset: () => initialState,
    setStartTime: (state) => {
      state.time.start = new Date().getTime();
    },
    setFinishTime: (state) => {
      state.time.start = state.time.start;
      state.time.finish = new Date().getTime();
    },
    setFailedGame: (state) => {
      state.isFail = true;
    },
  },
});

export const { setQuote, setGuess, reset, setStartTime, setFinishTime, setQuoteData, setFailedGame } =
  mainScreenSlice.actions;
export default mainScreenSlice.reducer;
