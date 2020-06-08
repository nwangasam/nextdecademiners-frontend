import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Select,
  Image,
  Input,
  Button,
  useClipboard,
} from '@chakra-ui/core';
import { FaEthereum } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';

const Deposit = (props) => {
  const [value, setValue] = useState('AzBqrlPabieYdIkdkjwoIESLIOEjojiwo');
  const { onCopy, hasCopied } = useClipboard(value);

  return (
    <Box>
      <Flex align='center' mb={8}>
        <Box as={FaEthereum} size='40px' mr={4} color='blue.400'></Box>
        <Heading size='lg' color='#353f52'>
          Deposit Ethereum
        </Heading>
      </Flex>
      <Stack spacing={2}>
        <Text fontSize='18px' fontWeight='500'>
          Currency
        </Text>
        <Select size='lg' icon={MdArrowDropDown} iconSize={8}>
          <option value='Ethereum'>Ethereum</option>
          <option value='Bitcoin'>Bitcoin</option>
          <option value='PerfectMoney'>Prefect money</option>
        </Select>
      </Stack>
      <Stack spacing={2} my={5}>
        <Text fontSize='18px' fontWeight='500'>
          Receive To
        </Text>
        <Select size='lg' icon={MdArrowDropDown} iconSize={8}>
          <option value='MyWallet'>My Ethereum Wallet (0 ETH)</option>
        </Select>
      </Stack>

      <Box w='100%'>
        <Image
          mx='auto'
          src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl${value}`}
          alt='Etereum Address QR code'
        />
      </Box>

      <Stack spacing={2}>
        <Text fontSize='18px' fontWeight='500'>
          Address
        </Text>
        <Flex mb={2}>
          <Input value={value} isReadOnly placeholder='Welcome' />
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Deposit;
