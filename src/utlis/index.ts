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

export const prepareHighscoreData = (highscores: Record<string, unknown>[]) =>
  highscores
    ?.map((hs) => ({
      userName: hs?.userName as string,
      score: Number(getHighscore(hs?.errors as number).toFixed(0)),
      id: hs.id as number,
    }))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 10);

export const getHighscore = (errors: number) => 100 / (1 + errors);

export const highscoreResponse = [
  {
    id: 0,
    quoteId: '2xpHvSOQMD',
    length: 54,
    uniqueCharacters: 17,
    userName: 'Quashawn',
    errors: 2,
    duration: 65956,
  },
  {
    id: 1,
    quoteId: 'HMBEfGB94i',
    length: 64,
    uniqueCharacters: 14,
    userName: 'Huy',
    errors: 8,
    duration: 80811,
  },
  {
    id: 2,
    quoteId: 'lJ60rOYWci',
    length: 177,
    uniqueCharacters: 20,
    userName: 'Idalie',
    errors: 9,
    duration: 219812,
  },
  {
    id: 3,
    quoteId: 'XNLGqepInX',
    length: 58,
    uniqueCharacters: 18,
    userName: 'Josephine',
    errors: 14,
    duration: 72087,
  },
  {
    id: 4,
    quoteId: 'aEPNVog6sT',
    length: 146,
    uniqueCharacters: 23,
    userName: 'Naiel',
    errors: 4,
    duration: 176872,
  },
  {
    id: 5,
    quoteId: 'QdK00IhCNX',
    length: 106,
    uniqueCharacters: 21,
    userName: 'Renzo',
    errors: 12,
    duration: 135097,
  },
  {
    id: 6,
    quoteId: '96eV21NlZKJ',
    length: 57,
    uniqueCharacters: 17,
    userName: 'Josephine',
    errors: 13,
    duration: 63513,
  },
  {
    id: 7,
    quoteId: '2xx4dfKrYVRf',
    length: 115,
    uniqueCharacters: 20,
    userName: 'Galena',
    errors: 5,
    duration: 142566,
  },
  {
    id: 8,
    quoteId: 'wEfrviG0x9r',
    length: 71,
    uniqueCharacters: 18,
    userName: 'Galena',
    errors: 9,
    duration: 85769,
  },
  {
    id: 9,
    quoteId: '6c2h-AtqMj6d',
    length: 91,
    uniqueCharacters: 19,
    userName: 'Dailynn',
    errors: 15,
    duration: 115920,
  },
  {
    id: 10,
    quoteId: 'CdL1z3NLSDrN',
    length: 64,
    uniqueCharacters: 17,
    userName: 'Gurjot',
    errors: 8,
    duration: 86806,
  },
  {
    id: 11,
    quoteId: 'l7UNABW6dA2',
    length: 43,
    uniqueCharacters: 16,
    userName: 'Gurjot',
    errors: 10,
    duration: 50944,
  },
  {
    id: 12,
    quoteId: 'sTma0kWPt2',
    length: 56,
    uniqueCharacters: 17,
    userName: 'Gurjot',
    errors: 15,
    duration: 65944,
  },
  {
    id: 13,
    quoteId: 'ARKzsqVpFY',
    length: 87,
    uniqueCharacters: 19,
    userName: 'Dailynn',
    errors: 4,
    duration: 111741,
  },
  {
    id: 14,
    quoteId: '5syS8jEn8m',
    length: 86,
    uniqueCharacters: 22,
    userName: 'Renzo',
    errors: 10,
    duration: 106316,
  },
  {
    id: 15,
    quoteId: 'bfpxfIQlqZ_3',
    length: 90,
    uniqueCharacters: 20,
    userName: 'Naiel',
    errors: 11,
    duration: 107881,
  },
  {
    id: 16,
    quoteId: '6Kl3UT6ULk',
    length: 92,
    uniqueCharacters: 22,
    userName: 'Quashawn',
    errors: 19,
    duration: 116834,
  },
  {
    id: 17,
    quoteId: 'Oh-e1-oygRPX',
    length: 60,
    uniqueCharacters: 17,
    userName: 'Naiel',
    errors: 13,
    duration: 71426,
  },
  {
    id: 18,
    quoteId: '2wYjTZiTUSgQ',
    length: 87,
    uniqueCharacters: 17,
    userName: 'Huy',
    errors: 5,
    duration: 105387,
  },
  {
    id: 19,
    quoteId: '4mPxqSvuiN',
    length: 70,
    uniqueCharacters: 19,
    userName: 'Idalie',
    errors: 3,
    duration: 88896,
  },
];

export const quotesResponse = {
  _id: 'rF6UYZ9W4T',
  content:
    'False friendship, like the ivy, decays and ruins the walls it embraces; but true friendship gives new life and animation to the object it supports.',
  author: 'Richard Burton',
  tags: ['Friendship'],
  authorSlug: 'richard-burton',
  length: 147,
  dateAdded: '2019-12-14',
  dateModified: '2023-04-14',
};
