import React, { memo, useState } from 'react';
import moment from 'moment';

import { Flex, Box, Text, Badge, Button, IconButton } from '@chakra-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminControls from '../../../hooks/useAdminControls';

import { FaBitcoin, FaEthereum, FaCheckCircle } from 'react-icons/fa';
import { ReactComponent as BitcoinCashIcon } from '../../../assets/images/bitcoin-cash.svg';

const MotionBox = motion.custom(Box);

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

const Withdrawal = ({ withdrawal, elRef, token }) => {
  const { acceptDepositRequest, loading, error, result } = useAdminControls(
    token
  );
  const [showControl, setShowControl] = useState(false);

  if (result) withdrawal.status = result.status;

  return (
    <Box ref={elRef} border='1px solid #EEE' borderRadius='4px' p={2} mb={4}>
      <Flex align='center' flexWrap='wrap' w='full'>
        <Box ml='3' mr='auto' onClick={() => setShowControl(!showControl)}>
          <Text fontWeight='500' fontSize='1rem' mb='0.4rem'>
            {withdrawal.email}
          </Text>
          <Text fontWeight='semibold' fontSize='.9rem' wordBreak='break-word'>
            {withdrawal.address}
          </Text>
          <Text color='red.400' mb={1} display='flex' alignItems='center'>
            <Box
              as={cryptoLogos[withdrawal.currency].icon}
              color={`${cryptoLogos[withdrawal.currency].color}.400`}
              size='2rem'
              p={1}
              mr={1}
            />
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number(withdrawal.amount))}
          </Text>
          <Text color='red.400' mb={1} fontSize='.8rem'>
            <Badge variantColor='green' as='span'>
              {moment(withdrawal.createdAt).fromNow().toString()}
            </Badge>
            <Box
              d='inline-block'
              ml='.8rem'
              as={withdrawal.status === 'confirmed' ? FaCheckCircle : 'span'}
              size='16px'
              color='green.400'
            />
          </Text>
        </Box>
        <WithdrawalControl
          withdrawal={withdrawal}
          showControl={showControl}
          loading={loading}
          acceptDepositRequest={acceptDepositRequest}
        />
        {error && <Text color='red.500'>Action was not successful!</Text>}
      </Flex>
    </Box>
  );
};

const WithdrawalControl = memo(
  ({ withdrawal, showControl, loading, acceptDepositRequest }) => {
    return (
      <AnimatePresence>
        {showControl && (
          <MotionBox
            flex='1'
            pointerEvents={withdrawal.status === 'confirmed' ? 'none' : 'all'}
            onClick={() => acceptDepositRequest(withdrawal)}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            <Button
              variant='ghost'
              fontWeight='500'
              fontSize='0.95rem'
              d={{ base: 'none', lg: 'flex' }}
              rightIcon={FaCheckCircle}
              variantColor={
                withdrawal.status === 'confirmed' ? 'green' : 'blue'
              }
              isLoading={loading}
              ml='auto'
              px={2}
              isDisabled={loading || withdrawal.status === 'confirmed'}
            >
              {withdrawal.status === 'confirmed' ? 'CONFIRMED' : 'CONFIRM'}
            </Button>
            <IconButton
              variant='ghost'
              minW='96px'
              isLoading={loading}
              isDisabled={loading || withdrawal.status === 'confirmed'}
              d={{ base: 'flex', lg: 'none' }}
              variantColor={
                withdrawal.status === 'confirmed' ? 'green' : 'blue'
              }
              ml='auto'
              aria-label={
                withdrawal.status === 'confirmed'
                  ? 'REQUEST CONFIRMED'
                  : 'CONFIRM REQUEST'
              }
              icon={FaCheckCircle}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    );
  }
);

export default memo(Withdrawal, (prev, next) => {
  if (!prev.loading && prev.withdrawal._id === next.withdrawal._id) return true;
  return false;
});

// withdrawal
