import React from 'react';
import Withdrawal from './Withdrawal';
import { TabPanel, Skeleton } from '@chakra-ui/core';

// custom hooks
import useFetchUserData from '../../../hooks/useFetchUserData';

const Withdrawals = React.forwardRef((props, ref) => {
  const {
    data: { withdrawals },
    error,
    loading,
  } = useFetchUserData(`/withdrawals`, props.token);


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

export default Withdrawals;
