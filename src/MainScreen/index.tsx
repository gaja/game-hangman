import { useEffect, useState } from 'react';

import { useQuote } from './api';

import { Loader } from '../components/Loader';

function MainScreen() {
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState(new Map());

  const [count, setCount] = useState(0);

  useEffect(() => {
    addEventListener('keydown', keyboardHandler);

    return () => removeEventListener('keydown', keyboardHandler);
  }, []);

  const keyboardHandler = (e: KeyboardEvent) => console.log(e.key);

  const processGuess = () => {
    return answer.split('').map((char) => (guess.has(char) ? char : '*'));
  };

  const { loading, error, data, refetch } = useQuote();

  if (count > 5) {
    return <>Game over!</>;
  }

  const reset = () => {
    refetch();
  };

  if (loading) {
    return <Loader />;
  }

  if (error?.message) {
    console.error(error);
  }

  return (
    <>
      {data?.content} *** {data?.author}
      <input type="submit" value="Reset" id="reset" onClick={reset} />
    </>
  );
}

export default MainScreen;
