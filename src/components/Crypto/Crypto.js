import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Badge,
  Tab,
  TabPanels,
} from '@chakra-ui/core';

import Deposits from './Deposits/Deposits';
import Withdrawals from './Withdrawals/Withdrawals';
import Total from './Total/Total';

import useUserDataTotals from '../../hooks/useUserDataTotals';

const Crypto = ({ user, totalBal, token }) => {
  const { total, error } = useUserDataTotals(token);

  console.log('CRYPTO is rendering...');

  const stats = [
    { id: 'total', text: 'Cryptos', total: null, color: 'purple' },
    {
      id: 'investments',
      text: 'Deposits',
      total: total.deposits,
      color: 'green',
    },
    {
      id: 'withdrawals',
      text: 'Withdrawals',
      total: total.withdrawals,
      color: 'red',
    },
  ];

  return (
    <Box gridColumn={{ lg: '2 / 3' }}>
      <Flex
        align='center'
        justify='space-between'
        d={{ base: 'none', lg: 'flex' }}
      >
        <Heading
          fontSize='16px'
          fontWeight='500'
          color='rgb(152, 161, 178)'
          as='h3'
        >
          Total Balance
        </Heading>
        <Text fontSize='32px' fontWeight='500' color='rgb(53, 63, 82)'>
          {user && totalBal()}
        </Text>
      </Flex>
      <Tabs variant='enclosed' mt={{ lg: 5 }} minH='300px' size='lg'>
        <TabList mb='1em'>
          {stats.map((stat, i) => {
            return (
              <Tab key={i + stat.text} flexWrap='wrap' display='flex'>
                {stat.text}&nbsp;
                {stat.total && (
                  <Badge as='span' variantColor={!error ? stat.color : 'red'}>
                    {!error ? stat.total : '!!'}
                  </Badge>
                )}
                &nbsp;
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as='ul'>
          <Total user={user} />
          <Deposits token={token} />
          <Withdrawals token={token} />
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Crypto;
