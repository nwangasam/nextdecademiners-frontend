import React from 'react';

import {
  Flex,
  Box,
  Heading,
  Text,
  Grid,
  Button,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/core';
import { FaBitcoin } from 'react-icons/fa';

const Investment = (props) => {
  return (
    <Box>
      <Flex>
        <Box as={FaBitcoin} mr={4} color='orange.400' size='48px'></Box>
        <Box>
          <Heading as='h2' size='xl' color='#353f52'>
            Invest Cryptocurrency
          </Heading>
          <Text
            color='rgb(103, 113, 133)'
            fontSize='20px'
            fontWeight='500'
            mt={2}
          >
            Deposit crypto and watch it grow.
          </Text>
        </Box>
      </Flex>
      <Grid
        my={8}
        templateColumns='repeat(auto-fit, minmax(240px, 1fr))'
        gap={4}
        rowGap={6}
        autoRows='minmax(40vh, auto)'
      >
        <Flex
          align='center'
          p={3}
          borderRadius='4px'
          shadow='md'
          border='1px solid #EEE'
          pt={8}
          direction='column'
        >
          <Heading size='lg' fontWeight='400' color='#777'>
            Basic Plan
          </Heading>

          <Text fontSize='32px' fontWeight='500' my={4}>
            1.4%
          </Text>
          <List spacing={3} px={3} textAlign='center'>
            <ListItem>
              <ListIcon icon='check-circle' color='green.500' />
              Lorem ipsum dolor sit amet
            </ListItem>
            <ListItem>
              <ListIcon icon='check-circle' color='green.500' />
              Assumenda, quia tempo.
            </ListItem>
          </List>
          <Button w='full' variantColor='blue' size='lg' mt={6}>
            Choose Plan
          </Button>
        </Flex>
        <Flex
          align='center'
          p={3}
          borderRadius='4px'
          shadow='md'
          border='1px solid #EEE'
          pt={8}
          direction='column'
        >
          <Heading size='lg' fontWeight='400' color='#777'>
            Premium Plan
          </Heading>
          <Text fontSize='32px' fontWeight='500' my={4}>
            6%
          </Text>
          <List spacing={3} px={3} textAlign='center'>
            <ListItem>
              <ListIcon icon='check-circle' color='green.500' />
              Lorem ipsum dolor sit amet
            </ListItem>
            <ListItem>
              <ListIcon icon='check-circle' color='green.500' />
              Assumenda, quia tempo.
            </ListItem>
          </List>
          <Button w='full' variantColor='blue' size='lg' mt={6}>
            Choose Plan
          </Button>
        </Flex>
      </Grid>
    </Box>
  );
};

export default Investment;
