import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Flex, Stack, Box, PseudoBox, Text, Heading } from '@chakra-ui/core';
import { AiFillHome } from 'react-icons/ai';
import { FaCrown } from 'react-icons/fa';
// import { ReactComponent as BitcoinCashIcon } from '../../assets/images/bitcoin-cash.svg';
import {
  MdAccountBalanceWallet,
  MdAccountCircle,
  MdAssignmentReturned,
  MdEqualizer,
} from 'react-icons/md';

const sidebarLinks = [
  {
    icon: AiFillHome,
    text: 'Dashboard',
    color: 'blue',
    link: '/',
    active: true,
  },
  { icon: MdEqualizer, text: 'Our plans', color: 'purple', link: '/invest' },
  {
    icon: MdAssignmentReturned,
    text: 'Deposit',
    color: 'green',
    link: '/deposit',
  },
  {
    icon: MdAccountBalanceWallet,
    text: 'Withdraw',
    color: 'red',
    link: '/withdraw',
  },
  { icon: MdAccountCircle, text: 'Profile', color: 'teal', link: '/account' },
];

const Sidebar = ({ user, isOpen, mobile, totalBalance }) => {
  let location = useLocation();

  /** Check if logged in user is an admin */
  const adminIndex = sidebarLinks.findIndex((s) => s.link === '/admin');
  if (adminIndex <= -1) {
    if (user && user.isAdmin) {
      sidebarLinks.push({
        icon: FaCrown,
        text: 'Admin',
        color: 'yellow',
        link: '/admin',
      });
    }
  }
  return (
    <Flex
      className={mobile ? 'mobile-only' : 'desktop-only'}
      as='section'
      left='0'
      bg='white'
      overflowY='auto'
      direction='column'
      m={{ base: '0' }}
      top='0'
      maxW={{ base: '270px', md: 'auto' }}
      w={{ base: '65%', md: '100%' }}
      h={{ base: '100vh', md: 'initial' }}
      p={{ base: '8rem 1rem 0 1rem', md: '0 1rem' }}
      zIndex={{ base: '10', md: 'initial' }}
      fontSize={{ base: '1.2em', md: '1em' }}
      pos={{ base: 'fixed', md: 'initial' }}
      display={{
        base: !mobile ? 'none' : 'flex',
        md: mobile ? 'none' : 'flex',
      }}
      boxShadow={{ base: '0px 2px 12px rgba(0,0,0,.3)', md: 'none' }}
      transform={{
        base: isOpen || !mobile ? 'translateX(0%)' : 'translateX(-110%)',
      }}
      transition='transform .3s ease-in-out'
    >
      <Box pl={2} d={{ base: 'none', lg: 'block' }}>
        <Heading
          as='h4'
          fontSize='14px'
          mb={0.4}
          fontWeight='600'
          color='rgb(103, 113, 133)'
        >
          Total Balance
        </Heading>
        <Text fontSize='32px' fontWeight='bold' color='rgb(53, 63, 82)'>
          {totalBalance()}
        </Text>
      </Box>
      <Stack as='ul' mt={{ base: 5, md: 8 }}>
        {[
          ...sidebarLinks.map((l, i) => {
            const active = location.pathname === l.link ? true : false;
            l.active = active;
            return (
              <Link key={l.link + i} to={l.link}>
                <Flex
                  cursor='pointer'
                  as='li'
                  borderRadius='4px'
                  overflow='hidden'
                  bg={l.active ? `${l.color}.100` : 'transparent'}
                  color={l.active ? `${l.color}.600` : 'rgb(103, 113, 133)'}
                  mb={2}
                >
                  <PseudoBox
                    _hover={{ color: `${l.color}.600`, bg: `${l.color}.100` }}
                    p={3}
                    d='flex'
                    w='100%'
                    alignItems='center'
                    justifyContent={{ md: 'center', lg: 'flex-start' }}
                  >
                    <Box as={l.icon} size='20px'></Box>
                    <Text
                      ml={4}
                      fontWeight='normal'
                      d={{ md: 'none', lg: 'block' }}
                    >
                      {l.text}
                    </Text>
                  </PseudoBox>
                </Flex>
              </Link>
            );
          }),
        ]}
      </Stack>
    </Flex>
  );
};

export default Sidebar;
