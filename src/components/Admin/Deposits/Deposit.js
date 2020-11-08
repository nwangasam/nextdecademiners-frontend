import React, { memo, useState } from 'react';
import moment from 'moment';

import {
  Flex,
  Box,
  Text,
  Badge,
  Button,
  IconButton,
} from '@chakra-ui/core';

import {
  FaBitcoin,
  FaEthereum,
  FaCheckCircle,
  FaPauseCircle,
  FaPlayCircle,
} from 'react-icons/fa';
import { ReactComponent as BitcoinCashIcon } from '../../../assets/images/bitcoin-cash.svg';
import { motion, AnimatePresence } from 'framer-motion';
import useAdminControls from '../../../hooks/useAdminControls';

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

const Deposit = ({ deposit, elRef, token }) => {
  const { updateDepositStatus, result, loading, error } = useAdminControls(
    token
  );
  const [showControl, setShowControl] = useState(false);

  if (result) deposit.status = result.status;

  return (
    <Box
      ref={elRef}
      border='1px solid #EEE'
      borderRadius='4px'
      p={2}
      d='flex'
      mb={4}
      // transition='transform .4s ease, box-shadow .4s ease'
      // _hover={{
      //   boxShadow: '6px 8px 16px rgba(0,0,0,.1)',
      //   transform: 'translateY(-8px) scaleX(1.035)',
      // }}
    >
      <Flex align='center' flexWrap='wrap' w='full'>
        <Box ml='3' mr='auto' onClick={() => setShowControl(!showControl)}>
          <Text fontWeight='500' fontSize='1rem' lineHeight='2'>
            {deposit.email}
          </Text>
          <Text color='green.400' mb={1} fontSize='.85rem'>
            {deposit.plan}
            <Badge ml='1' variantColor='green' as='span'>
              {moment(deposit.createdAt).fromNow().toString()}
            </Badge>
            <Badge ml='1' as='span'>
              {deposit.status}
            </Badge>
          </Text>
          <Text color='blue.400' mb={1} display='flex' alignItems='center'>
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

        <DepositControl
          deposit={deposit}
          showControl={showControl}
          loading={loading}
          updateDepositStatus={updateDepositStatus}
        />
        {error && <Text color='red.500'>Action was not successful!</Text>}
      </Flex>
    </Box>
  );
};

const DepositControl = memo(
  ({ deposit, showControl, updateDepositStatus, loading }) => {
    return (
      <AnimatePresence>
        {showControl && (
          <MotionBox
            flex='1'
            pos='relative'
            onClick={() => updateDepositStatus(deposit)}
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
              variant="ghost"
              fontWeight="500"
              fontSize="0.95rem"
              d={{ base: 'none', lg: 'flex' }}
              rightIcon={
                deposit.status === 'confirmed'
                  ? FaPauseCircle
                  : deposit.status === 'paused'
                  ? FaPlayCircle
                  : FaCheckCircle
              }
              variantColor={
                deposit.status === 'confirmed'
                  ? 'red'
                  : deposit.status === 'paused'
                  ? 'green'
                  : 'blue'
              }
              ml='auto'
              px={2}
              isLoading={loading}
              isDisabled={loading}
            >
              {deposit.status === 'confirmed'
                ? 'PAUSE'
                : deposit.status === 'paused'
                ? 'RESUME'
                : 'CONFIRM'}
            </Button>
            <IconButton
            variant="ghost"
              minW='96px'
              d={{ base: 'flex', lg: 'none' }}
              variantColor={
                deposit.status === 'confirmed'
                  ? 'red'
                  : deposit.status === 'paused'
                  ? 'green'
                  : 'blue'
              }
              isLoading={loading}
              isDisabled={loading}
              ml='auto'
              aria-label={
                deposit.status === 'confirmed'
                  ? 'Pause'
                  : deposit.status === 'paused'
                  ? 'Resume'
                  : 'Confirm Request'
              }
              icon={
                deposit.status === 'confirmed'
                  ? FaPauseCircle
                  : deposit.status === 'paused'
                  ? FaPlayCircle
                  : FaCheckCircle
              }
            />
          </MotionBox>
        )}
      </AnimatePresence>
    );
  }
);

export default memo(Deposit, (prev, next) => {
  if (!prev.loading && prev.deposit._id === next.deposit._id) return true;
  return false;
});
