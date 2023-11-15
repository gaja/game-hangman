import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useQuote } from './api';

import { Loader } from '../components/Loader';
import { setGuess, setQuote, reset as resetQuotes, setQuoteData, setStartTime } from './mainScreenSlice';

import { Quote } from './Quote';
import { Progress } from './Progress';


function MainScreen() {
  const dispatch = useDispatch();

  const { loading, error, data, refetch } = useQuote();

  useEffect(() => {
    addEventListener('keydown', keyboardHandler);

    return () => removeEventListener('keydown', keyboardHandler);
  }, []);

  const keyboardHandler = (e: KeyboardEvent) => {
    dispatch(setGuess(e.key))
  }

  // TODO: refactor. setQuote is not needed anymore
  dispatch(setQuote(data?.content))
  dispatch(setQuoteData(data))

  const reset = () => {
    refetch();
    dispatch(resetQuotes())
    dispatch(setStartTime())
  };

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    console.error(error);
  }

  return (
    <>
      <Progress />
      <Quote />
      <input type="submit" value="Reset" id="reset" onClick={reset} />
    </>
  );
}


export default MainScreen;
