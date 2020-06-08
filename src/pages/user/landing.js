import React, { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  Image,
  Box,
  Grid,
  Heading,
  Button,
  Divider,
  Icon,
} from '@chakra-ui/core';

import heroBg from '../../assets/images/bg.png';
import logoSrc from '../../assets/images/site-logo.png';
import { ReactComponent as MobileToggle } from '../../assets/images/mobile-toggle.svg';

const LandingPage = () => {
  const crypto = [
    { id: 'bitcoin', label: 'Bitcoin', price: '8,500' },
    { id: 'ethereum', label: 'Ethereum', price: '389' },
    { id: 'bitcoin-cash', label: 'Bitcoin Cash', price: '8,500' },
  ];

  return (
    <Box bg={'#F5F5F5'} minH='100vh'>
      <Box as='header' boxShadow='' bg='#152136' p={'8px 16px'}>
        <Flex as='nav' justify={'space-between'} align='center'>
          <Box>
            <Image src={logoSrc} alt='' />
          </Box>
          <Box color={'white'}>
            <MobileToggle />
          </Box>
        </Flex>
        <Divider borderColor={'rgba(225, 225, 225, .1)'} />
        <Flex
          as='ul'
          p='0'
          m='0'
          style={{ listStyle: 'none' }}
          align='center'
          justify={'space-around'}
          color={'white'}
        >
          {crypto.map((c, i) => (
            <Box flex={'1'} key={c.id} as='li' textAlign='center'>
              <Text
                mb='-1px'
                color={'#c2c9d5'}
                fontWeight='normal'
                fontSize={{ base: '16px', lg: 5 }}
              >
                {c.label}
              </Text>
              <Text
                color={''}
                fontSize={{ base: '16px', lg: 5 }}
                fontWeight={'500'}
              >
                ${c.price}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box
        as='section'
        bgImage={`url(${heroBg})`}
        bgSize={'cover'}
        bgPos={'bottom center'}
        textAlign={'center'}
        minH='75vh'
      >
        <Box pt='50px' px={'20px'}>
          <Heading
            fontWeight='bold'
            lineHeight='36px'
            color={'white'}
            fontSize='30px'
            mb='20px'
          >
            Profit generated Like{' '}
            <span style={{ color: '#F3703A' }}>Expert</span> Traders
          </Heading>
          <Heading
            fontSize='18px'
            fontWeight='normal'
            lineHeight='25px'
            color='white'
            mb={6}
          >
            Nextdecademiners Experts help you make Massive profit hourly
          </Heading>
          <Button
            boxShadow='0 8px 16px rgba(0,0,0,.3)'
            borderRadius='4px'
            h='50px'
            w='full'
            bg='#F3703A'
            lineHeight='50px'
            mb='18px'
            color={'white'}
            fonWeight={'bold'}
            fontSize={'18px'}
            maxW='260px'
            _hover={{ color: '#F3703A', bg: '#FFF' }}
          >
            Get Started
          </Button>
          <Text
            fontSize='14px'
            lineHeight='18px'
            color='white'
            textAlign='center'
            fontWeight='normal'
          >
            CEO of nextdecademiners.com <br />
            <b>Bryan Simon</b>
          </Text>
        </Box>
      </Box>
      <Grid
        templateColumns={`
        repeat(auto-fit, minmax(240px, 1fr))
      `}
        p={'1rem 0'}
        borderRadius={'8px'}
        shadow={'md'}
        my={'-250px'}
        mx={'1rem'}
        bg={'white'}
      >
        {[...Array(6)].map((_, i) => (
          <Flex key={i} p={'0 1.2rem'}>
            <Icon name='search' size='30px' />
            <Text>Profit Every Hour</Text>
          </Flex>
        ))}
      </Grid>
      <Box>
        <Heading>SINCE</Heading>
        <Text>December 1st, 2018</Text>
      </Box>
      <Box>
        <Heading>CHOOSE AN INVESTMENT PLAN</Heading>
        <Grid
          templateColumns={`
        repeat(auto-fit, minmax(240px, 1fr))
      `}
        >
          {[...Array(4)].map((_, i) => (
            <Flex key={i} direction='column'>
              <Text>BRONZE PLAN</Text>
              <Text>
                1.4%<span>/24hr</span>
              </Text>
              <Box as='ul'>
                <Text as='li'>Instant withdrawal</Text>
                <Text as='li'>Bitcoin, Ethereum, Bicoin Cash</Text>
                <Text as='li'>$100 - $499</Text>
              </Box>
              <Button>Sign up</Button>
            </Flex>
          ))}
        </Grid>
      </Box>
      <Grid>
        <Heading>ABOUT NEXTDECADEMINERS.COM</Heading>
        <Box>
          <Text>
            Nextdecademiners.com is United Kingdom registered company, (Company
            Number: 06416732, Enterprise House, 2 Pass Street, Oldham,
            Manchester, United Kingdom, OL9 6HZ.). We are an 7/24
            crypto-currency trading platform that works automatically, and it
            has been registered in the UK company, we offer a no-experience
            trading method to help you remove unnecessary risks. Over the past
            five years, our experts have come up with a workable automated
            arbitrage trading software from manual strategic trading that can
            help you earn a lot of money. In 2017, we made a record of $1
            million per day. From spot trading, futures trading and investment
            ICO project, we invested TRX and NEO heavily through our analysis
            and earned tens of millions of dollars. we are accept Bitcoin,
            Ethereum and Bitcoin Cash.
          </Text>
          <Text>Read more</Text>
        </Box>
        <Box>
          <Heading>COMPANY NUMBER - UK</Heading>
          <Text>06416732</Text>
        </Box>
      </Grid>
      <Box>
        <Heading>WHY CHOOSE NEXTDECADEMINERS.COM?</Heading>
        <Grid>
          {[...Array(3)].map((_, i) => (
            <Box key={i}>
              <Heading>Easy to use</Heading>
              <Text>
                Whether you are a beginner or a veteran in the online investment
                field, we are sure that you will find our platform easy to use.
                IT’s designed to be easy to navigate on every device
              </Text>
            </Box>
          ))}
        </Grid>
        <Button>GET STARTED</Button>
      </Box>
      <Flex wrap='wrap'>
        <Box as='ul'>
          <Heading>LINK</Heading>
          <Text as='li'>Home</Text>
          <Text as='li'>About us</Text>
          <Text as='li'>FAQs</Text>
        </Box>
        <Box as='ul'>
          <Heading>LOCATION</Heading>
          <Text as='li'>
            Enterprise House, 2 Pass Street, Oldham, Manchester, United Kingdom,
            OL9 6HZ.
          </Text>
        </Box>
        <Box as='ul'>
          <Heading>CONTACT</Heading>
          <Text as='li'>
            admin@nextdecademiners.com (Phone support provided for VIP Members
            only)
          </Text>
        </Box>
        <Box>
          <Image src={logoSrc} alt='' />
          <Text>&copy; 2020 NEXTDECADEMINERS.COM</Text>
          <Text>v.1.2.0</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LandingPage;
