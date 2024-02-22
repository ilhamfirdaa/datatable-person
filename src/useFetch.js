import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENDPOINT = 'https://randomuser.me/api/?';

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [data, setData] = useState(null);
  const fetchPerson = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        setData(res.data.results || res);

        setError({ show: false, msg: '' });
      } else {
        setError({ show: true, msg: res.statusText });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPerson(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);
  return { isLoading, error, data };
};

export default useFetch;
