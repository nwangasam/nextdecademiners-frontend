import React from 'react';

import { Box, Badge, Tabs, TabList, Tab, TabPanels } from '@chakra-ui/core';

import Users from './Users/Users';
import Deposits from './Deposits/Deposits';
import Withdrawals from './Withdrawals/Withdrawals';

import useDataTotals from '../../hooks/useDataTotals';

const Admin = (props) => {
  const { total, error } = useDataTotals(props.token);

  const stats = [
    { id: 'total', text: 'Users', total: total.users, color: 'purple' },
    {
      id: 'investments',
      text: 'Deposits',
      total: total.deposits,
      color: 'green',
    },
    {
      id: 'total',
      text: 'Withdrawals',
      total: total.withdrawals,
      color: 'red',
    },
  ];

  return (
    <Box gridColumn={{ lg: '2 / 3' }}>
      <Tabs isFitted variant='enclosed' mt={{ lg: 5 }} minH='300px'>
        <TabList mb='1em'>
          {stats.map((stat, i) => {
            return (
              <Tab
                outline='none'
                key={stat.id + i}
                flexWrap='wrap'
                display='flex'
              >
                {stat.text} <br />
                <Badge variantColor={!error ? stat.color : 'red'}>
                  {!error ? stat.total : '!!'}
                </Badge>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as='ul'>
          <Users token={props.token} />
          <Deposits token={props.token} />
          <Withdrawals token={props.token} />
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
