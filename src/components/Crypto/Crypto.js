import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Divider,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';

import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as PerfectMoney } from '../../assets/images/perfectMoney.svg';

const crypto = [
  {
    icon: FaBitcoin,
    text: 'Bitcoin',
    color: 'orange',
    id: 'bitcoin',
    symbol: 'BTC',
  },
  {
    icon: FaEthereum,
    text: 'Ether',
    color: 'gray',
    id: 'ethereum',
    symbol: 'ETH',
  },
  {
    icon: PerfectMoney,
    text: 'Perfect Money',
    color: 'red',
    id: 'perfectmoney',
    symbol: 'PM',
  },
];
const Crypto = (props) => {
  const [totalBalance, setTotalBalance] = useState(588.2);
  const [currency, setCurrency] = useState({ symbol: '$' });

  const [cryptoAmount, setCryptoAmount] = useState({
    bitcoin: {
      amount_usd: '345',
      amount: '0.005',
    },
    ethereum: {
      amount_usd: '24',
      amount: '0.02',
    },
    perfectmoney: {
      amount_usd: '577',
      amount: '0.1',
    },
  });
  const stats = [
    { id: 'total', text: 'Total' },
    { id: 'investments', text: 'Investments' },
    { id: 'total', text: 'Withdrawals' },
  ];

  return (
    <Box gridColumn={{ lg: '2 / 3' }}>
      <Flex align='center' justify='space-between' d={{ base: 'none', lg: 'flex' }}>
        <Heading
          fontSize='16px'
          fontWeight='500'
          color='rgb(152, 161, 178)'
          as='h3'
        >
          Total Balance
        </Heading>
        <Text fontSize='32px' fontWeight='500' color='rgb(53, 63, 82)'>
          {currency.symbol + totalBalance.toFixed(2)}
        </Text>
      </Flex>
      <Tabs variant='soft-rounded' variantColor='green' mt={{ base: 6, lg: 5 }}>
        <TabList mb='1em'>
          {stats.map((stat, i) => {
            return (
              <Tab key={stat.id} outline='none'>
                {stat.text}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as='ul'>
          <TabPanel>
            {crypto.map((c) => (
              <>
                <Flex align='center' py={{ base: 2, md: 3, lg: 4 }}>
                  <Box as={c.icon} size='32px' color={`${c.color}.400`}></Box>
                  <Heading
                    fontSize='20px'
                    fontWeight='500'
                    ml={3}
                    color='color: rgb(53, 63, 82)'
                  >
                    {c.text}
                  </Heading>
                  <Flex direction='column' align='flex-end' ml='auto'>
                    <Text
                      fontSize='18px'
                      fontWeight='500'
                      color='rgb(53, 63, 82)'
                    >
                      ${cryptoAmount[c.id].amount_usd}
                    </Text>
                    <Text
                      fontSize='16px'
                      color='rgb(152, 161, 178)'
                      fontWeight='500'
                    >
                      {cryptoAmount[c.id].amount + c.symbol}
                    </Text>
                  </Flex>
                </Flex>
                <Divider w='100%' mx='auto' />
              </>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Crypto;
