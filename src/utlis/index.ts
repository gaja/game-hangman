export const isString = (payload: string) => /^[a-z]$/i.test(payload);

export const isDuplicate = (guess: string, payload: string) =>
  guess
    .split('')
    .map((g) => g.toUpperCase())
    .includes(payload.toUpperCase());

export const maskQuote = (quote: string, guess: string, mask = '*') => {
  const guessArray = guess?.split('') || [];
  const quoteArray = quote?.split('') || [];

  return quoteArray
    .map((quote) => {
      return quote === ' ' ? ' ' : guessArray.includes(quote.toUpperCase()) ? quote : mask;
    })
    .join('');
};

export const guessNotIncludedInQuotes = ({ guess, quote }: { guess: string; quote: string }) => {
  const upperQuote = quote.toUpperCase();
  return {
    isIncluded: !upperQuote.split('').includes(guess.toUpperCase()),
    guess,
  };
};
