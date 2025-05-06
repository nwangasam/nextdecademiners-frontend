import React from 'react';

import { Flex, Box, Heading, Text, Button } from '@chakra-ui/core';

import { MdTimelapse } from 'react-icons/md';

const Notification = () => {
  return (
    <Flex
      p={4}
      gridArea='deposit'
      borderRadius={2}
      border='1px solid rgb(240, 242, 247)'
      as='section'
      align='center'
    >
      <Box as={MdTimelapse} mr={4} color='orange.400' size='40px'></Box>
      <Box>
        <Heading as='h2' size='md' color='#353f52'>
          Finish Signing Up
        </Heading>
        <Text
          color='rgb(103, 113, 133)'
          fontSize='18px'
          fontWeight='500'
          mt={1}
        >
          Once you finish signing up, deposit crypto and start earning interest.
        </Text>
      </Box>
      <Button variantColor='blue' ml='auto' size='lg'>
        Deposit Crypto
      </Button>
    </Flex>
  );
};

export default Notification;
