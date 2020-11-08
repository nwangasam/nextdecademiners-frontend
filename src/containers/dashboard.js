import React, { lazy, Suspense } from 'react';
import useFetchUserData from '../hooks/useFetchUserData';

import { Grid, Flex } from '@chakra-ui/core';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from '@chakra-ui/core';
// import { Skeleton, Heading, Spinner } from "@chakra-ui/core";
import Sidebar from '../components/Sidebar/Sidebar';

const MainNavigation = lazy(() =>
  import('../components/Navigation/MainNavigation/MainNavigation')
);
const Crypto = lazy(() => import('../components/Crypto/Crypto'));
const Chart = lazy(() => import('../components/Chart/Chart'));
const Deposit = lazy(() => import('../components/Deposit/Deposit'));
const Withdraw = lazy(() => import('../components/Withdraw/Withdraw'));
const Invest = lazy(() => import('../components/Investment/Investment'));
const Account = lazy(() => import('../components/Account/Account'));
const Admin = lazy(() => import('../components/Admin/Admin'));

const Dashboard = (props) => {
  const {
    data: { user },
    loading,
    error,
  } = useFetchUserData(`/profile`, props.token);

  const renderTotalBalance = (currency) => {
    if (!user) return;
    let total = 0;
    const userBal = { ...user.balance };
    for (const cur in userBal) {
      total += userBal[cur];
    }
    if (currency && typeof currency === 'number') total = currency;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(Number(total));
  };

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'minmax(150px, 20%) 1fr minmax(480px, 1fr)',
      }}
      templateRows={{ base: '8rem auto auto', md: 'auto auto auto' }}
      gap={4}
      rowGap={{ base: '1rem', md: '2rem' }}
    >
      <MainNavigation
        user={user}
        userLoading={loading}
        userError={error}
        totalBalance={renderTotalBalance}
      />
      <Sidebar user={user} totalBalance={renderTotalBalance} />

      <Flex direction='column' as='section' p='0 1rem'>
        <Suspense
          fallback={
            <Grid pos='0' h='100vh' style={{ placeItems: 'center' }} gap={5}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Grid>
          }
        >
          <Switch>
            <Route
              path='/'
              exact
              render={(properties) => (
                <Crypto
                  {...properties}
                  token={props.token}
                  user={user}
                  totalBal={renderTotalBalance}
                />
              )}
            />

            <Route
              path='/deposit'
              render={(properties) => (
                <Deposit {...properties} user={user} token={props.token} />
              )}
            />

            <Route path='/invest' component={Invest} />

            <Route
              path='/withdraw'
              render={(properties) => (
                <Withdraw
                  {...properties}
                  user={user}
                  token={props.token}
                  totalBalance={renderTotalBalance}
                />
              )}
            />
            <Route
              path='/admin'
              render={(properties) => (
                <Admin {...properties} user={user} token={props.token} />
              )}
            />
            <Route
              path='/account'
              render={(properties) => (
                <Account
                  {...properties}
                  user={user}
                  totalBalance={renderTotalBalance}
                  logoutHandler={props.logoutHandler}
                />
              )}
            />
          </Switch>
        </Suspense>
      </Flex>
      <Route path='/' exact component={Chart} />
    </Grid>
  );
};

export default Dashboard;
