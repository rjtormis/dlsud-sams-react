import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(url, expected, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const cancel_token = axios.CancelToken.source();
    setTimeout(() => {
      const source = axios
        .get(url, { ...options, cancelToken: cancel_token.token })
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
  }, [url, options, expected]);
  return { data, loading, error };
}

export default useFetch;
