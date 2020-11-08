import React from 'react';
import { TabPanel, Skeleton, Box, Grid } from '@chakra-ui/core';

import Deposit from './Deposit';
import useFetchAdminData from '../../../hooks/useFetchAdminData';

let depositTotal = () => 0;

const Deposits = React.forwardRef((props, ref) => {
  const {
    data: { deposits, totalDeposits },
    loading,
    observedElement,
    error,
  } = useFetchAdminData('/deposits', props.token);

  depositTotal = () => {
    return totalDeposits ? totalDeposits : '...';
  };

  return (
    <TabPanel ref={ref} {...props}>
      <Skeleton isLoaded>
        {deposits &&
          deposits.map((deposit, i) => (
            <Deposit
              key={deposit._id}
              deposit={deposit}
              loading={loading}
              elRef={deposits.length === i + 2 ? observedElement : null}
              token={props.token}
            />
          ))}
        {loading && <LoadingSkeleton loading={loading} />}
        {error && <p>Error loading deposits</p>}
      </Skeleton>
    </TabPanel>
  );
});

const LoadingSkeleton = React.memo((loading) => (
  <Box ml="1.75rem">
    <Skeleton isLoaded={!loading} height='1.5rem' my='8px' maxW='70%' />
    <Skeleton isLoaded={!loading} height='1.2rem' my='8px' maxW='80%' />
    <Grid templateColumns='2rem 1fr' columnGap='0.9rem'>
      <Skeleton isLoaded={!loading} height='2rem' w='2rem' borderRadius='50%' />
      <Skeleton isLoaded={!loading} height='1.5rem' maxW='16%' />
    </Grid>
  </Box>
));

export { depositTotal };

export default React.memo(Deposits);
