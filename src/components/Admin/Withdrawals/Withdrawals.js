import React from 'react';
import { TabPanel, Skeleton, Grid, Box } from '@chakra-ui/core';

import Withdrawal from './Withdrawal';
import useFetchAdminData from '../../../hooks/useFetchAdminData';

const Withdrawals = React.forwardRef((props, ref) => {
  const {
    data: { withdrawals },
    loading,
    observedElement,
    error,
  } = useFetchAdminData('/withdrawals', props.token);

  return (
    <TabPanel ref={ref} {...props}>
      <Skeleton isLoaded>
        {withdrawals &&
          withdrawals.map((withdrawal, i) => (
            <Withdrawal
              key={withdrawal._id}
              withdrawal={withdrawal}
              loading={loading}
              elRef={withdrawals.length === i + 2 ? observedElement : null}
              token={props.token}
            />
          ))}
        {loading && <LoadingSkeleton loading={loading} />}
        {error && <p>Error loading withdrawals</p>}
      </Skeleton>
    </TabPanel>
  );
});

const LoadingSkeleton = React.memo((loading) => (
  <Box ml='1.75rem'>
    <Skeleton isLoaded={!loading} height='1.5rem' my='8px' maxW='70%' />
    <Skeleton isLoaded={!loading} height='1.2rem' my='8px' maxW='80%' />
    <Grid templateColumns='2rem 1fr' columnGap='0.9rem'>
      <Skeleton isLoaded={!loading} height='2rem' w='2rem' borderRadius='50%' />
      <Skeleton isLoaded={!loading} height='1.4rem' maxW='16%' />
    </Grid>
    <Skeleton isLoaded={!loading} height='1.2rem' my='8px' maxW='20%' />
  </Box>
));

export default React.memo(Withdrawals);
