import React from 'react';
import Withdrawal from './Withdrawal';
import { TabPanel, Skeleton } from '@chakra-ui/core';

// custom hooks
import useFetchUserData from '../../../hooks/useFetchUserData';

let withdrawalTotal = () => 0;

const Withdrawals = React.forwardRef((props, ref) => {
  const {
    data: { withdrawals, totalWithdrawals },
    error,
    loading,
  } = useFetchUserData(`/withdrawals`, props.token);

  withdrawalTotal = () => {
    return totalWithdrawals ? totalWithdrawals : '...'
  }

  console.log('WITHDRAWAL LIST IS RENDERING...');
  console.log('MY WITHDRAWALS', withdrawals)

  return (
    <TabPanel className='data-list' ref={ref} {...props}>
      <Skeleton isLoaded>

      {loading && <p>Fetching your withdrawals...</p>}
      {error && <p>We couldn't fetch your withdrawals. Reload page.</p>}
      {withdrawals && !withdrawals.slice(0)[0] && (
        <p>You haven't made any withdrawal yet</p>
      )}

      {withdrawals && !loading
        ? withdrawals.map((withdrawal) => (
            <Withdrawal key={withdrawal._id} withdrawal={withdrawal} />
          ))
        : null}
      </Skeleton>
    </TabPanel>
  );
})

export { withdrawalTotal }

export default Withdrawals;
