import React from 'react';
import Deposit from './Deposit';
import { TabPanel, Skeleton } from '@chakra-ui/core';

// custom hooks
import useFetchUserData from '../../../hooks/useFetchUserData';

const Deposits = React.forwardRef((props, ref) => {
    const {
      data: { deposits },
      error,
      loading,
    } = useFetchUserData(`/deposits`, props.token);
  
    return (
      <TabPanel className='data-list' ref={ref} {...props}> 
      <Skeleton isLoaded>

        {loading && <p>Fetching your investments...</p>}
        {error && <p>Error fetching your investments. Reload page.</p>}
        {deposits && !deposits.slice(0)[0] && (
          <p>You haven't made any investment yet. Deposit now.</p>
        )}
  
        {deposits && !loading
          ? deposits.map((deposit) => (
              <Deposit key={deposit._id} deposit={deposit} />
            ))
          : null}
      </Skeleton>
      </TabPanel>
    );
});

export default Deposits;
