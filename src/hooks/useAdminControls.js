import { useState, useCallback } from 'react';

const useAdminControls = (token) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Pause investment,

  const updateDepositStatus = useCallback(
    async (deposit) => {
      if (!deposit._id || loading) return;
      let route = '';
      let method = 'POST';
      let data = {};

      switch (deposit.status) {
        case 'confirmed':
          route = `/${deposit._id}`;
          method = 'PUT';
          break;
        case 'paused':
          route = `?id=${deposit._id}&userId=${deposit.user}`;
          break;
        default:
          data = deposit;
          break;
      }
      let url = `${process.env.REACT_APP_API_URL}/admin/deposit${route}`;
      const requestOption = {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      setLoading(true);
      setError(false);
      try {
        const request = await fetch(url, requestOption);
        const response = await request.json();
        console.log('RESULTING RESPONSE 2', response);
        setResult(response.result || response.deposit);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }

    },
    [token, loading]
  );

  const acceptDepositRequest = useCallback(
    async (withdrawal) => {
      if (!withdrawal._id || loading) return;
      let url = `${process.env.REACT_APP_API_URL}/admin/withdraw`;

      setLoading(true);
      setError(false);
      try {
        const req = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(withdrawal),
        })
        const res = await req.json();
        
        console.log('RESULTING DATA', res);
        setResult(res.result || res.withdrawal);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    },
    [token, loading]
  );

  return { acceptDepositRequest, updateDepositStatus, result, loading, error };
};

export default useAdminControls;
