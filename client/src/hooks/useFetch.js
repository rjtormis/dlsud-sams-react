import axios from "axios";

import { useState, useEffect } from "react";
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function useFetch(url, expected, auth) {
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
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
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
  }, [url, expected, auth]);
  return { data, loading, error };
}

export default useFetch;
