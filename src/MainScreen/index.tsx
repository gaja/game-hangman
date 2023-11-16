import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useQuote } from './api';

import { Loader } from '../components/Loader';
import { setGuess, reset as resetQuotes, setStartTime } from './mainScreenSlice';

import { Quote } from './Quote';
import { Progress } from './Progress';

// @ts-ignore
import useSound from 'use-sound';
import soundKey from '/sound/key.mp3'
import guitarRiff from '/sound/bt_riff.mp3'

function MainScreen() {
  const [play] = useSound(soundKey);
  const [gPlay] = useSound(guitarRiff);

  const dispatch = useDispatch();

  const { loading, error, refetch } = useQuote();

  useEffect(() => {
    addEventListener('keydown', keyboardHandler);

    return () => removeEventListener('keydown', keyboardHandler);
  }, []);

  const keyboardHandler = (e: KeyboardEvent) => {
    dispatch(setGuess(e.key))
    play()
  }

  const reset = () => {
    gPlay()
    refetch();
    dispatch(resetQuotes())
    dispatch(setStartTime())
    console.clear()
  };

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    console.error(error);
  }

  return (
    <div className="mainScreen">
      <Progress />
      <Quote />
      <input type="submit" value="Reset" id="reset" onClick={reset} />
    </div>
  );
}


export default MainScreen;
