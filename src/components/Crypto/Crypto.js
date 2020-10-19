import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Flex,
  Box,
  Heading,
  Text,
  Divider,
  Tabs,
  TabList,
  Badge,
  Tab,
  IconButton,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';

import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as BitcoinCashIcon } from '../../assets/images/bitcoin-cash.svg';

const cryptoLogos = {
  bitcoin: {
    icon: FaBitcoin,
    color: 'orange',
  },
  ethereum: {
    icon: FaEthereum,
    color: 'gray',
  },
  'bitcoin-cash': {
    icon: BitcoinCashIcon,
    color: 'yellow',
  },
};

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
    icon: BitcoinCashIcon,
    text: 'Bitcoin Cash',
    color: 'yellow',
    id: 'bitcoin-cash',
    symbol: 'BCH',
  },
];
const Crypto = ({ user, totalBal, token }) => {
  const [loadingPage, setLoadingPage] = useState(false);
  const [pageError, setPageError] = useState(false);

  const [deposits, setDeposits] = useState(null);
  const [withdrawals, setWithdrawals] = useState(null);
  const [total, setTotal] = useState({
    deposits: '...',
    withdrawals: '...',
  });

  const [page, setPage] = useState({
    deposits: 1,
    withdrawals: 1,
  });
  const [limit, setLimit] = useState({
    deposits: 5,
    withdrawals: 4,
  });

  const [next, setNext] = useState({
    deposits: {},
    withdrawals: {},
  });
  const [prev, setPrev] = useState({
    deposits: {},
    withdrawals: {},
  });

  const stats = [
    { id: 'total', text: 'Total', total: null, color: 'purple' },
    { id: 'investments', text: 'Investments', total: total.deposits, color: 'green' },
    { id: 'total', text: 'Withdrawals', total: total.withdrawals, color: 'red' },
  ];

  function renderPagination(type) {
    return (
      (prev[type] || next[type]) && (
        <Flex margin='0 auto' justifyContent='flex-end' alignItems='center'>
          <IconButton
            aria-label='Previous Button'
            icon={loadingPage ? 'spinner' : 'arrow-left'}
            onClick={() => setPage((p) => ({ ...p, [type]: prev[type].page }))}
            disabled={!prev[type] || loadingPage}
          />
          <Box as='span' fontWeight='bold' margin='0 4rem'>{page[type]} / {Math.ceil(total[type] / limit[type])}</Box>
          <IconButton
            aria-label='Next Button'
            icon={loadingPage ? 'spinner' : 'arrow-right'}
            onClick={() => setPage((p) => ({ ...p, [type]: next[type].page }))}
            disabled={!next[type] || loadingPage}
          />
        </Flex>
      )
    );
  }

  function setPagination(type, prev, next, total) {
    setTotal((t) => ({ ...t, [type]: total }));
    setNext((n) => ({ ...n, [type]: next }));
    setPrev((p) => ({ ...p, [type]: prev }));
  }

  async function fetchUserData(route) {
    setLoadingPage(true);
    const requestOption = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const request = await axios(
        `https://nextdecademiners.herokuapp.com/user/${route}`,
        requestOption
      );

      setPageError(false);
      setLoadingPage(false);
      setLimit({
        deposits: 5,
        withdrawals: 4,
      });
      return request.data;
    } catch (err) {
      setPageError(() => true);
      console.log('ERROR FROM CRYPTO', pageError)
      setLoadingPage(false);
      return;
    }
  }

  useEffect(() => {
    (async () => {
      const { deposits, totalDeposits, prev, next } = await fetchUserData(
        `deposits?page=${page.deposits}&limit=${limit.deposits}`
      );
      if (!deposits) return;
      setDeposits(() => deposits);
      setPagination('deposits', prev, next, totalDeposits);
    })();
  }, [token, page.deposits, limit.deposits, fetchUserData]);

  useEffect(() => {
    (async () => {
      const { withdrawals, totalWithdrawals, prev, next } = await fetchUserData(
        `withdrawals?page=${page.withdrawals}&limit=${limit.withdrawals}`
      );
      if (!withdrawals) return;
      setWithdrawals(() => withdrawals);
      setPagination('withdrawals', prev, next, totalWithdrawals);
    })();
  }, [token, page.withdrawals, limit.withdrawals, fetchUserData]);

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
      <Tabs isFitted variant='enclosed' mt={{ lg: 5 }} minH='300px'>
        <TabList mb='1em'>
          {stats.map((stat, i) => {
            return (
              <Tab key={i + stat.text} outline='none' flexWrap='wrap' display='flex'>
                {stat.text}{' '}<br></br>
                {stat.total && (
                  <Badge as='span' color={stat.color}>
                    {stat.total}
                  </Badge>
                )}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as='ul'>
          <TabPanel pr={3}>
            {crypto.map((c, i) => (
              <React.Fragment key={c.id + Math.random()}>
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
                      {user &&
                        new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(user.balance[c.id]))}
                    </Text>
                    <Text
                      fontSize='16px'
                      color='rgb(152, 161, 178)'
                      fontWeight='500'
                    >
                      {`${c.symbol}`}
                    </Text>
                  </Flex>
                </Flex>
                <Divider w='100%' mx='auto' />
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel>
            {deposits &&
              deposits.length > 0 &&
              deposits.map((deposit, i) => (
                <Box
                  border='1px solid #EEE'
                  key={deposit._id + Math.random()}
                  borderRadius='4px'
                  p={2}
                  mb={4}
                >
                  <Flex align='center'>
                    <Box
                      as={cryptoLogos[deposit.currency].icon}
                      color={`${cryptoLogos[deposit.currency].color}.400`}
                      size='calc(2.2rem + 1vw)'
                    />
                    <Box ml='3' mr='auto'>
                      <Text color='blue.400' mb={1} fontWeight='semibold'>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(deposit.amount))}
                      </Text>
                      <Text color='green.400' mb={1} fontSize='.85rem'>
                        {deposit.plan}
                        <Text ml='3' as='span' color='gray.400'>
                          {moment(deposit.createdAt).fromNow().toString()}
                        </Text>
                      </Text>
                      <Badge
                        ml='auto'
                        variantColor={
                          deposit.status === 'unconfirmed' ? 'red' : 'green'
                        }
                      >
                        {deposit.status === 'unconfirmed'
                          ? 'Unconfirmed'
                          : 'Confirmed'}
                      </Badge>
                    </Box>
                  </Flex>
                </Box>
              ))}
            {deposits && deposits.length <= 0 && (
              <Text fontSize='lg'>
                You've not made any deposit!{' '}
                <Link to='/deposit'>Make Deposit Now</Link>
              </Text>
            )}
            {renderPagination('deposits')}
          </TabPanel>
          <TabPanel>
            {withdrawals &&
              withdrawals.length > 0 &&
              withdrawals.map((withdrawal, i) => (
                <Box
                  border='1px solid #EEE'
                  key={withdrawal._id + Math.random()}
                  borderRadius='4px'
                  p={2}
                  mb={4}
                >
                  <Flex align='center'>
                    <Box
                      as={cryptoLogos[withdrawal.currency].icon}
                      color={`${cryptoLogos[withdrawal.currency].color}.400`}
                      size='calc(2.2rem + 1vw)'
                    />
                    <Box ml='3' mr='auto'>
                      <Text color='red.400' mb={1} fontWeight='semibold'>
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(withdrawal.amount))}
                      </Text>
                      <Text color='green.400' mb={1} fontSize='.85rem'>
                        {withdrawal.address}
                        <Text ml='3' as='span' color='gray.400'>
                          {moment(withdrawal.updatedAt).fromNow().toString()}
                        </Text>
                      </Text>
                      <Badge
                        ml='auto'
                        variantColor={
                          withdrawal.status === 'unconfirmed' ? 'red' : 'green'
                        }
                      >
                        {withdrawal.status === 'unconfirmed'
                          ? 'Unconfirmed'
                          : 'Confirmed'}
                      </Badge>
                    </Box>
                  </Flex>
                </Box>
              ))}
            {withdrawals && withdrawals.length <= 0 && (
              <Text fontSize='lg'>You've not made any withdrawal!</Text>
            )}
            {renderPagination('withdrawals')}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Crypto;
