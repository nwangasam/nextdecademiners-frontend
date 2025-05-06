import React from 'react';
import moment from 'moment';
import { Box, Flex, Text, Badge } from '@chakra-ui/core';

import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as BitcoinCashIcon } from '../../../assets/images/bitcoin-cash.svg';

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

const Withdrawal = ({ withdrawal }) => {
  return (
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
            variantColor={withdrawal.status === 'unconfirmed' ? 'red' : 'green'}
          >
            {withdrawal.status === 'unconfirmed' ? 'Unconfirmed' : 'Confirmed'}
          </Badge>
        </Box>
      </Flex>
    </Box>
  );
};

export default Withdrawal;
