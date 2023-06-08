import React from 'react';
import axios from 'dw/core/axios';

export const useFetchReleaseNotes = () => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('release-notes/');
        setResponse(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);
  return { response, error };
};
