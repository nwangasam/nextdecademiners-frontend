import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchUserData = (route, token) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setLoading(true);

        const request = await axios(
          `${process.env.REACT_APP_API_URL}/user${route}?page=1&limit=50`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setLoading(false);
        setData(request.data);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    })();
  }, [route, token]);

  return { data, loading, error }
};

export default useFetchUserData;
