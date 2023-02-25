import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(url, options, expected) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const source = axios.CancelToken.source();
    try {
      const response = axios.get(url, { ...options, cancelToken: source.token });
      setLoading(false);
      setData(response.data[expected]);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
    return () => {
      source.cancel();
    };
  }, [url, options, expected]);
  return { data, loading, error };
}

export default useFetch;
