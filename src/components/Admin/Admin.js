import React, { useState, useEffect, createRef } from 'react';
import moment from 'moment';
import axios from 'axios';

import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as BitcoinCashIcon } from '../../assets/images/bitcoin-cash.svg';

import {
  Flex,
  Box,
  Heading,
  Text,
  Skeleton,
  Button,
  Avatar,
  Badge,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';

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

const Admin = (props) => {
  const [users, setUsers] = useState(null);

  const [total, setTotal] = useState({
    users: '...',
    deposits: '...',
    withdrawals: '...',
  });

  const [deposits, setDeposits] = useState();
  // const [totalDeposits, setTotalDeposits] = useState();

  const [withdrawals, setWithdrawals] = useState();
  // const [totalWithdrawals, setTotalWithdrawals] = useState();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    users: 1,
    deposits: 1,
    withdrawals: 1,
  });
  const [limit, setLimit] = useState({
    users: 8,
    deposits: 10,
    withdrawals: 7,
  });

  const [next, setNext] = useState({
    users: {},
    deposits: {},
    withdrawals: {},
  });

  const [prev, setPrev] = useState({
    users: {},
    deposits: {},
    withdrawals: {},
  });

  const [elRefs, setElRefs] = useState({
    users: [],
    deposits: [],
    withdrawals: [],
  });

  const [loadingPage, setLoadingPage] = useState(false);
  const [pageError, setPageError] = useState(false);

  async function fetchAdminData(route) {
    const requestOption = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
    };
    setLoadingPage(true);
    try {
      const request = await axios(
        `https://nextdecademiners.herokuapp.com/admin/${route}`,
        requestOption
      );
      
      setPageError(false)
      setLoadingPage(false);
      return request.data;
    } catch(err) {
      setPageError(true)
      setLoadingPage(false);
      return;
    }
  }

  function setPagination(type, prev, next, total) {
    setTotal((t) => ({ ...t, [type]: total }));
    setNext((n) => ({ ...n, [type]: next }));
    setPrev((p) => ({ ...p, [type]: prev }));
  }

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

  // fetch all users
  useEffect(() => {
    (async () => {
      const { users, totalUsers, prev, next } = await fetchAdminData(
        `users?page=${page.users}&limit=${limit.users}`
      );
      if (!users) return;
        setUsers(() => users);
        setPagination('users', prev, next, totalUsers);
    })();
  }, [page.users, limit.users]);

  // fetch all deposits
  useEffect(() => {
    (async () => {
      const { deposits, prev, next, totalDeposits } = await fetchAdminData(
        `deposits?page=${page.deposits}&limit=${limit.deposits}`
      );
      if (!deposits) return;
      setElRefs((elRefs) => ({
        ...elRefs,
        deposits: Array(deposits.length)
          .fill()
          .map((_, i) => elRefs.deposits[i] || createRef()),
      }));
      setDeposits(() => deposits);
      setPagination('deposits', prev, next, totalDeposits);
    })();
  }, [page.deposits, limit.deposits]);

  // fetch all withdrawals
  useEffect(() => {
    (async () => {
      const {
        withdrawals,
        prev,
        next,
        totalWithdrawals,
      } = await fetchAdminData(
        `withdrawals?page=${page.withdrawals}&limit=${limit.withdrawals}`
      );
      if (!withdrawals) return;
      setElRefs((elRefs) => ({
        ...elRefs,
        withdrawals: Array(withdrawals.length)
          .fill()
          .map((_, i) => elRefs.withdrawals[i] || createRef()),
      }));
      setWithdrawals(() => withdrawals);
      setPagination('withdrawals', prev, next, totalWithdrawals);
    })();
  }, [page.withdrawals, limit.withdrawals]);

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

  function confirmDepositHandler(e, depositData) {
    const requestOption = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
    };
    if (!depositData._id) return;
    setLoading(true);
    fetch(`https://nextdecademiners.herokuapp.com/admin/deposit`, {
      method: 'POST',
      headers: requestOption.headers,
      body: JSON.stringify(depositData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        props.history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function confirmWithdrawalHandler(e, withdrawal) {
    if (!withdrawal._id) return;
    setLoading(true);
    fetch(`https://nextdecademiners.herokuapp.com/admin/withdraw`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(withdrawal),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        props.history.replace('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function toggleAcceptButton(type, btnIndex) {
    const isDisplayed = elRefs[type][btnIndex].current.style.display;
    if (isDisplayed === 'none') {
      elRefs[type][btnIndex].current.style.display = 'block';
    } else {
      elRefs[type][btnIndex].current.style.display = 'none';
    }
  }

  return (
    <Box gridColumn={{ lg: '2 / 3' }}>
      <Tabs isFitted variant='enclosed' mt={{ lg: 5 }} minH='300px'>
        <TabList mb='1em'>
          {stats.map((stat, i) => {
            return (
              <Tab outline='none' key={stat.id + i} flexWrap='wrap' display='flex'>
                <Skeleton isLoaded={users}>
                  {stat.text}{' '}<br></br>
                  <Badge variantColor={stat.color}>{stat.total}</Badge>
                </Skeleton>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as='ul'>
          <TabPanel>
            <Skeleton isLoaded={users}>
              {users &&
                users.map((user, i) => (
                  <Flex
                    key={user._id + Math.random()}
                    my={5}
                    ref={elRefs.users[i]}
                  >
                    <Avatar name={user.name} />
                    <Box ml='3'>
                      <Text fontWeight='bold'>
                        {user.name}
                        <Badge ml='1' variantColor='green' as='span' >
                          {moment(user.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                      <Text fontSize='sm' color='blue.400'>
                        {user.email}
                      </Text>
                      <Text as='span' fontSize='.8rem' color='blue.400'>
                        Referal:{' '}
                        {user.referalEmail ? user.referalEmail : 'None'}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              {renderPagination('users')}
            </Skeleton>
          </TabPanel>
          <TabPanel>
            {deposits &&
              deposits.map((deposit, i) => (
                <Box
                  border='1px solid #EEE'
                  key={deposit._id + Math.random()}
                  borderRadius='4px'
                  p={2}
                  mb={4}
                >
                  <Flex
                    align='center'
                    flexWrap='wrap'
                    transition='.3s width ease'
                  >
                    <Box
                      ml='3'
                      mr='auto'
                      onClick={() => toggleAcceptButton('deposits', i)}
                    >
                      <Text fontWeight='500' fontSize='1rem' lineHeight='2'>
                        {deposit.email}
                      </Text>
                      <Text color='green.400' mb={1} fontSize='.85rem'>
                        {deposit.plan}
                        <Badge ml='1' variantColor='green' as='span'>
                          {moment(deposit.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                      <Text
                        color='blue.400'
                        mb={1}
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          as={cryptoLogos[deposit.currency].icon}
                          color={`${cryptoLogos[deposit.currency].color}.400`}
                          size='2rem'
                          p={1}
                          mr={1}
                        />
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(deposit.amount))}
                      </Text>
                    </Box>

                    <Box
                      ref={elRefs.deposits[i]}
                      flex='1'
                      pos='relative'
                      onClick={(e) => confirmDepositHandler(e, deposit)}
                      transition={'opacity .28s ease-out'}
                      display='none'
                      pointerEvents={
                        loading || deposit.status === 'confirmed'
                          ? 'none'
                          : 'all'
                      }
                    >
                      <Button
                        d={{ base: 'none', lg: 'flex' }}
                        rightIcon='check-circle'
                        variantColor={
                          deposit.status === 'confirmed' ? 'green' : 'blue'
                        }
                        ml='auto'
                        px={2}
                        isLoading={loading}
                        isDisabled={loading || deposit.status === 'confirmed'}
                        cursor={
                          deposit.status === 'confirmed'
                            ? 'not-allowed'
                            : 'pointer'
                        }
                      >
                        {deposit.status === 'confirmed'
                          ? 'Confirmed'
                          : 'Confirm Request'}
                      </Button>
                      <IconButton
                        minW='96px'
                        isDisabled={loading || deposit.status === 'confirmed'}
                        d={{ base: 'flex', lg: 'none' }}
                        variantColor={
                          deposit.status === 'confirmed' ? 'green' : 'blue'
                        }
                        isLoading={loading}
                        ml='auto'
                        cursor={
                          deposit.status === 'confirmed'
                            ? 'not-allowed'
                            : 'pointer'
                        }
                        aria-label={
                          deposit.status === 'confirmed'
                            ? 'Confirmed'
                            : 'Confirm Request'
                        }
                        icon='check-circle'
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
            {renderPagination('deposits')}
          </TabPanel>
          <TabPanel>
            {withdrawals &&
              withdrawals.map((withdraw, i) => (
                <Box
                  border='1px solid #EEE'
                  key={withdraw._id + Math.random()}
                  borderRadius='4px'
                  p={2}
                  mb={4}
                >
                  <Flex align='center' flexWrap='wrap'>
                    <Box
                      ml='3'
                      mr='auto'
                      onClick={() => toggleAcceptButton('withdrawals', i)}
                    >
                      <Text fontWeight='500' fontSize='1rem'>
                        {withdraw.email}
                      </Text>
                      <Text fontWeight='semibold' fontSize='1rem'>
                        {withdraw.address}
                      </Text>
                      <Text
                        color='red.400'
                        mb={1}
                        display='flex'
                        alignItems='center'
                      >
                        <Box
                          as={cryptoLogos[withdraw.currency].icon}
                          color={`${cryptoLogos[withdraw.currency].color}.400`}
                          size='2rem'
                          p={1}
                          mr={1}
                        />
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(Number(withdraw.amount))}
                      </Text>
                      <Text color='red.400' mb={1} fontSize='.8rem'>
                        <Badge variantColor='green' as='span'>
                          {moment(withdraw.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                    </Box>

                    <Box
                      ref={elRefs.withdrawals[i]}
                      flex='1'
                      display='none'
                      onClick={(e) => confirmWithdrawalHandler(e, withdraw)}
                      transition={'opacity .28s ease-out'}
                      pointerEvents={
                        loading || withdraw.status === 'confirmed'
                          ? 'none'
                          : 'all'
                      }
                    >
                      <Button
                        d={{ base: 'none', lg: 'flex' }}
                        rightIcon='check-circle'
                        variantColor={
                          withdraw.status === 'confirmed' ? 'green' : 'blue'
                        }
                        isLoading={loading}
                        ml='auto'
                        px={2}
                        isDisabled={loading || withdraw.status === 'confirmed'}
                        cursor={
                          withdraw.status === 'confirmed'
                            ? 'not-allowed'
                            : 'pointer'
                        }
                      >
                        {withdraw.status === 'confirmed'
                          ? 'Confirmed'
                          : 'Confirm Request'}
                      </Button>
                      <IconButton
                        minW='96px'
                        isLoading={loading}
                        isDisabled={loading || withdraw.status === 'confirmed'}
                        d={{ base: 'flex', lg: 'none' }}
                        variantColor={
                          withdraw.status === 'confirmed' ? 'green' : 'blue'
                        }
                        ml='auto'
                        cursor={
                          withdraw.status === 'confirmed'
                            ? 'not-allowed'
                            : 'pointer'
                        }
                        aria-label={
                          withdraw.status === 'confirmed'
                            ? 'Confirmed'
                            : 'Confirm Request'
                        }
                        icon='check-circle'
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
            {renderPagination('withdrawals')}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
