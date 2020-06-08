import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import {
  Flex,
  Stack,
  Box,
  PseudoBox,
  Text,
  Divider,
  Heading,
} from '@chakra-ui/core';
import { AiFillHome } from 'react-icons/ai';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as PerfectMoney } from '../../assets/images/perfectMoney.svg';
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
  {
    icon: MdAssignmentReturned,
    text: 'Deposit',
    color: 'green',
    link: '/deposit',
  },
  { icon: MdEqualizer, text: 'Earn Interest', color: 'green', link: '/invest' },
  {
    icon: MdAccountBalanceWallet,
    text: 'Withdraw',
    color: 'red',
    link: '/withdraw',
  },
  { icon: MdAccountCircle, text: 'Account', color: 'blue', link: '/account' },
];

const crypto = [
  { icon: FaBitcoin, text: 'Bitcoin', color: 'orange', link: '/bitcoin' },
  { icon: FaEthereum, text: 'Ether', color: 'blue', link: '/ethereum' },
  {
    icon: PerfectMoney,
    text: 'Perfect Money',
    color: 'red',
    link: '/perfectmoney',
  },
];

const Sidebar = (props) => {
  const sidebarTransform = {
    base: props.isOpen !== true ? 'translateX(-100%)' : 'translateX(0)',
    md: props.isOpen !== true ? 'translateX(-100%)' : 'translateX(0)',
    lg: 'translateX(0)',
  };

  const sidebarSettings = {
    p: 2,
    borderRadius: '4px',
    gridColumn: '1 / 2',
    direction: 'column',
    bg: 'white',
    pos: { base: 'fixed', md: 'fixed' },
    left: 0,
    bottom: 0,
    top: { base: '5rem', md: '5rem' },
    transform: sidebarTransform,
    transition: 'transform .7s ease',
    shadow: { base: 'md', md: 'md' },
    w: { base: '70%', md: '240px' },
    zIndex: { base: 'overlay', md: 'overlay' },
  };
  return (
    <Flex {...sidebarSettings}>
      <Box pl={2} d={{ base: 'none', lg: 'block'}}>
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
          $0.00
        </Text>
      </Box>
      <Stack as='ul' spacing={1} mt={{ base: 5, lg: 4 }}>
        {sidebarLinks.map((l, i) => {
          const active = props.location.pathname === l.link ? true : false;
          l.active = active;
          return (
            <Link key={l.link + i} to={l.link}>
              <Flex
                cursor='pointer'
                as='li'
                fontSize='1.1em'
                borderRadius='4px'
                overflow='hidden'
                bg={l.active ? `${l.color}.100` : 'transparent'}
                color={l.active ? `${l.color}.600` : 'rgb(103, 113, 133)'}
                onClick={props.closeSidebar}
              >
                <PseudoBox
                  _hover={{ color: `${l.color}.600`, bg: `${l.color}.100` }}
                  p={3}
                  d='flex'
                  w='100%'
                  alignItems='center'
                >
                  <Box as={l.icon} size='24px'></Box>
                  <Text ml={4} fontWeight='normal'>
                    {l.text}
                  </Text>
                </PseudoBox>
              </Flex>
            </Link>
          );
        })}
        <Divider style={{ margin: '16px auto' }} w='80%' />
        {crypto.map((c, i) => (
          <Flex
            cursor='pointer'
            as='li'
            fontSize='1.1em'
            borderRadius='4px'
            bg={c.active ? `${c.color}.100` : 'transparent'}
            color={c.active ? `${c.color}.600` : 'rgb(103, 113, 133)'}
            overflow='hidden'
          >
            <PseudoBox
              p={3}
              w='100%'
              _hover={{ color: `${c.color}.600`, bg: `${c.color}.100` }}
              d='flex'
              alignItems='center'
            >
              <Box as={c.icon} size='24px'></Box>
              <Text ml={4} fontWeight='normal'>
                {c.text}
              </Text>
            </PseudoBox>
          </Flex>
        ))}
      </Stack>
    </Flex>
  );
};

export default Sidebar;
