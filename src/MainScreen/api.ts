import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { APIBaseUrlResults, APIBaseUrlQuotes as baseURL } from '../constants';
import { useDispatch } from 'react-redux';
import { setQuote, setQuoteData } from './mainScreenSlice';

const API = axios.create({
  baseURL,
});

const APIResults = axios.create({
  baseURL: APIBaseUrlResults,
});

// Quotes
const getRiddle = (link: string = 'random') => API.get(link);

// Highscores
const sendResults = (data: SendResult) =>
  APIResults.post('highscores', data)
    .then((res) => res)
    .catch((e) => e as Error);
const getResults = (link: string = 'highscores') => APIResults.get(link);

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
      const quote = await getRiddle().then((res) => res.data);

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

  let initialized = useRef(false).current;

  useEffect(() => {
    if (!initialized) {
      initialized = true;

      sendResults();
    }
  }, []);

  const refetch = () => {
    sendResults();
  };

  const sendResults = async () => {
    setLoading(true);

    try {
      const results = await sendResults().then(() => getResults());
      setData(results);
    } catch (error) {
      setError(error as Error);
    }

    setLoading(false);
  };

  return { loading, error, data, refetch };
};
