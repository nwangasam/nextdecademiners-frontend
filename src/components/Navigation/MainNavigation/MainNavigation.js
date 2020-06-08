import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Flex,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Button,
} from '@chakra-ui/core';

import MobileToggle from '../MobileToggle/MobileToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

// import Navigation Items

const mainNavigation = (props) => {
  return (
    <>
      <Flex as='nav' w='full' align='center' p={{ base: '8px 0', md: '8px 0' }}>
        <Logo />
        <Flex as='ul' ml='auto' d={{ base: 'none', md: 'none' }}>
          <NavigationItems
            isAutht={true}
            onLogout={console.log('loging out...')}
          />
        </Flex>
      </Flex>
      <Divider style={{ margin: 0, padding: 0 }} />
      <Flex
        w='full'
        align='center'
        p={{ base: '8px 0', md: '8px 0' }}
        d={{ lg: 'none' }}
      >
        <Box d='inline-block'>
          <MobileToggle {...props} />
        </Box>
        <Divider orientation='vertical' borderColor='rgba(225, 225, .6)' />
        <Heading fontWeight='600' size='md' color='white' ml={3} mr='auto'>
          $0.00
        </Heading>
        <Menu ml='auto'>
          <MenuButton
            as={Button}
            rightIcon='chevron-down'
            bg='none'
            color='white'
            _expanded={{ bg: 'green.100', color: 'green.500' }}
            _focus={{ outline: 0, boxShadow: 'outline' }}
          >
            <Heading fontWeight='600' size='md'>
              Transact
            </Heading>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to='/deposit'>Deposit</Link>
            </MenuItem>
            <MenuItem>
              <Link to='/invest'>Earn Interest</Link>
            </MenuItem>
            <MenuItem>
              <Link to='/withdraw'>Withdraw</Link>
            </MenuItem>
            <MenuItem>
              <Link to='/account'>My Account</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default mainNavigation;
