import { useEffect, useState } from 'react';

const useUserDataTotals = (token) => {
  const [total, setTotal] = useState({
    deposits: '...',
    withdrawals: '...',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const urls = ['/deposits', '/withdrawals'];
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    Promise.all(urls.map((url) => fetch(`https://nextdecademiners.herokuapp.com/user${url}`, option)))
      .then((response) => {
        return Promise.all(response.map((res) => res.json()));
      })
      .then(([deposits, withdrawals]) => {
        setTotal({
            deposits: deposits.totalDeposits, 
            withdrawals: withdrawals.totalWithdrawals
        })
      })
      .catch((err) => {
        setError(err);
        console.error('FAILED TO GET ALL TOTALS', err);
      });
  }, [token]);

  return { total, error };
};

export default useUserDataTotals;
