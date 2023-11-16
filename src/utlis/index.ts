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
      if (
        quote === ' ' ||
        quote === '.' ||
        quote === ';' ||
        quote === ',' ||
        quote === "'" ||
        quote === '?' ||
        quote === '—' ||
        quote === '-'
      )
        return quote;

      return guessArray.includes(quote.toUpperCase()) ? quote : mask;
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

export const getUniqueCharactersLength = (quote: string) => {
  if (!quote?.length) return 0;

  return [...new Set(quote.split('').map((q) => q.toUpperCase()))].length;
};

export const calcTimeDelta = (time: { start: number; finish: number }) =>
  time.finish === 0 || time.start === 0 ? 0 : time.finish - time.start;
