import { useEffect, useState } from 'react';

const useDatatotals = (token) => {
  const [total, setTotal] = useState({
    users: '...',
    deposits: '...',
    withdrawals: '...',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const urls = ['/users', '/deposits', '/withdrawals'];
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    Promise.all(urls.map((url) => fetch(`${process.env.REACT_APP_API_URL}/api/admin${url}`, option)))
      .then((response) => {
        return Promise.all(response.map((res) => res.json()));
      })
      .then(([users, deposits, withdrawals]) => {
        setTotal({
            users: users.totalUsers,
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

export default useDatatotals;
