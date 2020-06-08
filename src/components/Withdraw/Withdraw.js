import React from 'react';
import {
  Flex,
  Stack,
  Box,
  Heading,
  Text,
  Select, 
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

import { FaBitcoin } from 'react-icons/fa';
import {
  MdArrowDropDown,
} from 'react-icons/md';

const Withdraw = () => {
  return (
    <Box>
      <Flex align='center' mb={8}>
        <Box as={FaBitcoin} size='40px' mr={4} color='orange.600'></Box>
        <Heading size='lg' color='#353f52'>
          Withdraw Bitcoin
        </Heading>
      </Flex>
      <Stack spacing={4} isInline align='center'>
        <Stack spacing={2} flex='30%'>
          <Text fontSize='18px' fontWeight='500'>
            Currency
          </Text>
          <Select size='lg' icon={MdArrowDropDown} iconSize={8}>
            <option value='Bitcoin'>Bitcoin</option>
            <option value='Ethereum'>Ethereum</option>
            <option value='PerfectMoney'>Prefect money</option>
          </Select>
        </Stack>
        <Stack spacing={2} my={5} flex='1fr'>
          <Text fontSize='18px' fontWeight='500'>
            From
          </Text>
          <Select size='lg' icon={MdArrowDropDown} iconSize={8}>
            <option value='MyWallet'>My Bitcoin Wallet (0 BTC)</option>
          </Select>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Text fontSize='18px' fontWeight='500'>
          To
        </Text>
        <Input placeholder='Your Bitcoin Addresss' size='lg' />
      </Stack>

      <Stack spacing={2} my={5}>
        <Text fontSize='18px' fontWeight='500'>
          Amount
        </Text>
        <Flex align='center' w='100%'>
          <Flex flex='1'>
            <InputGroup size='lg'>
              <Input placeholder='$0.0' />
              <InputRightElement
                children={
                  <Text fontSize='14px' fontWeight='500' color='gray.300'>
                    USD
                  </Text>
                }
              />
            </InputGroup>
          </Flex>
          <Text fontSize='20px' fontWeight='600' color='gray.400' mr={1}>
            =
          </Text>
          <Flex flex='1'>
            <InputGroup size='lg' m={0}>
              <Input placeholder='0.0BTC' />
              <InputRightElement
                children={
                  <Text fontSize='14px' fontWeight='500' color='gray.300'>
                    BTC
                  </Text>
                }
              />
            </InputGroup>
          </Flex>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Withdraw;
