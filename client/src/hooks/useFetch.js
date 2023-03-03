import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(url, expected) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const cancel_token = axios.CancelToken.source();
    setTimeout(() => {
      const source = axios
        .get(url, {
          cancelToken: cancel_token.token,
        })
        .then((response) => {
          setLoading(false);
          setData(response.data[expected]);
        })
        .catch((e) => {
          setLoading(false);
          setError(e);
        });

      return () => {
        source.cancel();
      };
    }, 1000);
  }, [url, expected]);
  return { data, loading, error };
}

export default useFetch;
