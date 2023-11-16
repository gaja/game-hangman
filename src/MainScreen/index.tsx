import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQuote } from './api';

import { setGuess, reset as resetQuotes, setStartTime } from './mainScreenSlice';

import { Quote } from './Quote';
import { Progress } from './Progress';

// @ts-ignore
import useSound from 'use-sound';
import soundKey from '/sound/key.mp3'
import guitarRiff from '/sound/bt_riff.mp3'
import { RootState } from '../store';

function MainScreen() {
  const [play] = useSound(soundKey);
  const [gPlay] = useSound(guitarRiff);

  const dispatch = useDispatch();

  const isFailGame = useSelector((state: RootState) => state.mainScreen.isFail)

  const { loading, error, refetch } = useQuote();

  useEffect(() => {
    addEventListener('keydown', keyboardHandler);

    return () => removeEventListener('keydown', keyboardHandler);
  }, []);

  const keyboardHandler = (e: KeyboardEvent) => {
    if (isFailGame) return
    play()
    dispatch(setGuess(e.key))
  }

  const reset = () => {
    gPlay()
    refetch();
    dispatch(resetQuotes())
    dispatch(setStartTime())
    console.clear()
  };

  if (error?.message) {
    console.error(error);
  }

  return (
    <div className="mainScreen">
      <Progress />
      <Quote loading={loading} />
      <input type="submit" value="Reset" id="reset" onClick={reset} />
    </div>
  );
}


export default MainScreen;
