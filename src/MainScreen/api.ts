import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import { APIBaseUrlResults, APIBaseUrlQuotes as baseURL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setQuote, setQuoteData } from './mainScreenSlice';
import { RootState } from '../store';
import { calcTimeDelta, getUniqueCharactersLength } from '../utlis';

const API = axios.create({
  baseURL,
});

const APIResults = axios.create({
  baseURL: APIBaseUrlResults,
});

// Quotes
const APIGetRiddle = (link: string = 'random') => API.get(link);

// Highscores
const APISendResults = (data: SendResult) =>
  APIResults.post('highscores', data)
    .then((res) => res)
    .catch((e) => e as Error);
const APIGetResults = (link: string = 'highscores') => APIResults.get(link);

export interface QuoteResponse {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export const useQuote = () => {
  const dispatch = useDispatch();
  // TODO: add API Schema Validation for response
  const [data, setData] = useState<QuoteResponse>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  let initialized = useRef(false).current;

  useEffect(() => {
    if (!initialized) {
      initialized = true;

      fetchQuote();
    }
  }, []);

  const refetch = () => {
    fetchQuote();
  };

  const fetchQuote = async () => {
    setLoading(true);

    try {
      const quote = await APIGetRiddle().then((res) => res.data);

      dispatch(setQuote(quote?.content));
      dispatch(setQuoteData(quote));

      setData(quote);
    } catch (error) {
      setError(error as Error);
    }

    setLoading(false);
  };

  return { loading, error, data, refetch };
};

interface SendResult {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}

export const useScores = () => {
  // TODO: add API Schema Validation for response
  const [data, setData] = useState({});
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const quoteData = useSelector((state: RootState) => state.mainScreen.quoteData);
  const userName = useSelector((state: RootState) => state.username.userName);
  const errors = useSelector((state: RootState) => state.mainScreen.misses);
  const time = useSelector((state: RootState) => state.mainScreen.time);

  let initialized = useRef(false).current;

  const sendData = useMemo(
    () =>
      ({
        quoteId: quoteData._id,
        length: quoteData.length,
        uniqueCharacters: getUniqueCharactersLength(quoteData.content),
        userName,
        errors,
        duration: calcTimeDelta(time),
      } as SendResult),
    [quoteData._id, quoteData.length, userName, error, time.finish, time.start]
  );

  useEffect(() => {
    if (!initialized) {
      initialized = true;

      sendResults(sendData);
    }
  }, []);

  const refetch = () => {
    sendResults(sendData);
  };

  const sendResults = async (sendData: SendResult) => {
    setLoading(true);

    try {
      const results = await APISendResults(sendData).then(() => APIGetResults());
      setData(results);
    } catch (error) {
      setError(error as Error);
    }

    setLoading(false);
  };

  return { loading, error, data, refetch };
};
