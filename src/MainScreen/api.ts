import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { APIBaseUrlQuotes as baseURL } from '../constants';

const API = axios.create({
  baseURL,
});

const getRiddle = (link: string = 'random') => API.get(link);

interface QuoteResponse {
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
  // TODO: add API Schema Validation for Jokes response
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
      setData(quote);
    } catch (error) {
      setError(error as Error);
    }

    setLoading(false);
  };

  return { loading, error, data, refetch };
};
