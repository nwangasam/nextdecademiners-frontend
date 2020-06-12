import React from 'react';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

import {
  Box,
  Icon,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  Button,
  MenuButton,
} from '@chakra-ui/core';

const Chart = () => {
  return (
    <Box gridColumn={{ lg: '3 / 4'}}>
      <Menu>
        <MenuButton as={Button}>
          <Heading
            as='h1'
            fontSize='18px'
            fontWeight='600'
            d='flex'
            color='#000'
            alignItems='center'
          >
            <Box
              as={FaEthereum}
              mr={2}
              size='22px'
              color='blue.400'
              d='inline'
            ></Box>{' '}
            Ethereum (ETH)
            <Icon
              name='chevron-down'
              size='30px'
              pos='relative'
              top='2.4px'
              ml={4}
            />
          </Heading>
        </MenuButton>
        <MenuList>
          <MenuItem minH='48px'>
            <Box size='1.4rem' rounded='full' as={FaBitcoin} mr='12px' />
            <span>Bitcoin (BTC)</span>
          </MenuItem>
          <MenuItem minH='48px'>
            <Box size='1.4rem' rounded='full' as={FaEthereum} mr='12px' />
            <span>Ethereum (ETH)</span>
          </MenuItem>
          <MenuItem minH='48px'>
            <Box size='1.4rem' rounded='full' as={FaBitcoin} mr='12px' />
            <span>Perfect Money</span>
          </MenuItem>
        </MenuList>
      </Menu>
      <Box w='full'>
        <Box h='540px' p='0px' m='0px' w='full'>
          <iframe
          title={'Crypto Live Data'}
            src={`https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=145&pref_coin_id=1505`}
            width='100%'
            height='536px'
            scrolling='auto'
            marginWidth='0'
            marginHeight='0'
            frameBorder='0'
            borderradius='8px'
            border='0'
            style={{ border: 0, margin: 0, padding: 0, lineHeight: '14px' }}
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default Chart;
