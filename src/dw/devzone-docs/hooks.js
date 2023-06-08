import React from 'react';
import axios from 'axios';

export const useFetchMarkdown = path => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(path, { responseType: 'text' });
        setResponse(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);
  return { response, error };
};
