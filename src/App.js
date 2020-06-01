import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaPercentage, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { MdAccountBox, MdTimelapse } from 'react-icons/md';
import {
  Grid,
  Flex,
  Text,
  Stack,
  Heading,
  Box,
  Divider,
  PseudoBox,
  Button,
} from '@chakra-ui/core';

const sidebarLinks = [
  { icon: AiFillHome, text: 'Dashboard', color: 'blue', active: true },
  { icon: FaPercentage, text: 'Earn Interest', color: 'green' },
  { icon: GoSignOut, text: 'Withdraw', color: 'red' },
  { icon: MdAccountBox, text: 'Account', color: 'blue' },
];

const crypto = [
  { icon: FaBitcoin, text: 'Bitcoin', color: 'orange' },
  { icon: FaEthereum, text: 'Ether', color: 'red' },
  { icon: FaBitcoin, text: 'Perfect Money', color: 'blue' },
];

const App = (props) => {
  return (
    <Grid
      maxW='100%'
      minH='100vh'
      templateColumns={{ base: '1fr', md: '250px repeat(2, 1fr)' }}
      templateRows={{ base: '60px auto 1fr 1fr', md: '50px auto 1fr' }}
      gridGap={{ md: 4 }}
      templateAreas={{
        base: `"nav" "deposit" "crypto" "meta"`,
        md: `"nav nav nav" "sidebar deposit deposit" "sidebar crypto meta"`,
      }}
      bg='transparent'
    >
      <Flex
        as='nav'
        bg='blue.300'
        align='center'
        p={2}
        w='full'
        justify='space-between'
        gridArea='nav'
      >
        <Flex align='center' as='a'>
          Logo
        </Flex>
        <Flex as='ul'>Nav Items</Flex>
      </Flex>

      <Flex
        p={2}
        borderRadius='4px'
        gridArea='sidebar'
        d={{ base: 'none', md: 'block' }}
      >
        <Box pl={2}>
          <Heading as='h4' fontSize='14px' mb={0.4} fontWeight="600" color='rgb(103, 113, 133)'>
            Total Balance
          </Heading>
          <Text fontSize='32px' fontWeight='bold' color='rgb(53, 63, 82)'>
            $0.00
          </Text>
        </Box>
        <Stack as='ul' spacing={1} mt={4}>
          {sidebarLinks.map((l, i) => (
            <Flex
              cursor='pointer'
              as='li'
              fontSize='1.1em'
              borderRadius='4px'
              overflow='hidden'
              bg={l.active ? `${l.color}.100` : 'transparent'}
              color={l.active ? `${l.color}.600` : 'rgb(103, 113, 133)'}
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
          ))}
          <Divider style={{ margin: '16px auto'}} w='80%' />
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

      <Flex
        p={4}
        gridArea='deposit'
        borderRadius={2}
        border='1px solid rgb(240, 242, 247)'
        as='section'
      >
        <Box as={MdTimelapse} color="orange.400" size="32px"></Box>
        <Box>
          <Heading as="h2" size="md">Finish Signing Up</Heading>
          <Text color="gray.400">Once you finish sining up, start investing crypto</Text>
        </Box>
        <Button variantColor="blue.600">Deposit Crypto</Button>
      </Flex>

      <Flex
        p={6}
        gridArea='crypto'
        borderRadius={2}
        border='1px solid rgb(240, 242, 247)'
        as='section'
        direction='column'
      >
        <Flex align='center' justify='space-between'>
          <Heading
            fontSize='16px'
            fontWeight='500'
            color='rgb(152, 161, 178)'
            as='h3'
          >
            Total Balance
          </Heading>
          <Text fontSize='32px' fontWeight='500' color='rgb(53, 63, 82)'>
            $0.00
          </Text>
        </Flex>

        <Flex my={8} bg='gray.50' borderRadius='4px' p={1}>
          <Button
            flex='1'
            bg='white'
            _hover={{ bg: 'white', color: 'blue.600' }}
            color='blue.600'
            boxShadow='rgba(5, 24, 61, 0.1) 0px 4px 8px'
          >
            Total
          </Button>
          <Button
            flex='1'
            variant='ghost'
            color='gray.600'
            _hover={{ color: 'blue.600' }}
          >
            Investments
          </Button>
          <Button
            flex='1'
            variant='ghost'
            color='gray.600'
            _hover={{ color: 'blue.600' }}
          >
            Withdrawals
          </Button>
        </Flex>

        <Box as='ul'>
          {crypto.map((c) => (
            <>
              <Flex align='center' py={4}>
                <Box as={c.icon} size='32px' color={`${c.color}.600`}></Box>
                <Heading
                  fontSize='20px'
                  fontWeight='500'
                  ml={3}
                  color='color: rgb(53, 63, 82)'
                >
                  {c.text}
                </Heading>
                <Flex direction='column' align='flex-end' ml='auto'>
                  <Text
                    fontSize='16px'
                    fontWeight='500'
                    color='rgb(53, 63, 82)'
                  >
                    $0.00
                  </Text>
                  <Text
                    fontSize='14px'
                    color='rgb(152, 161, 178)'
                    fontWeight='500'
                  >
                    0.00 BTC
                  </Text>
                </Flex>
              </Flex>
              <Divider w='100%' mx='auto' />
            </>
          ))}
        </Box>
      </Flex>

      <Flex
        p={4}
        gridArea='meta'
        borderRadius={2}
        border='1px solid rgb(240, 242, 247)'
      >
        <Text as='h1' sizes='xl' fontWeight='bold'>
          Meta Panel
        </Text>
      </Flex>
    </Grid>
  );
};

export default App;
