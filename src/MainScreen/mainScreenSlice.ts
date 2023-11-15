import { createSlice } from '@reduxjs/toolkit';

import { guessNotIncludedInQuotes, isDuplicate, isString } from '../utlis';

interface InitialState {
  quote: string;
  guess: string;
  misses: number;
  missedChars: string[];
  time: {
    start?: Date;
    finish?: Date;
  };
}

const initialState: InitialState = {
  quote: '',
  guess: '',
  misses: 0,
  missedChars: [],
  time: { start: undefined, finish: undefined },
};

const mainScreenSlice = createSlice({
  name: 'mainScreen',
  initialState,
  reducers: {
    setQuote: (state, { payload }) => {
      state.quote = payload;
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
      state.time.start = new Date();
    },
    setFinishTime: (state) => {
      state.time.finish = new Date();
    },
  },
});

export const { setQuote, setGuess, reset, setStartTime, setFinishTime } = mainScreenSlice.actions;
export default mainScreenSlice.reducer;
