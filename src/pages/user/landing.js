import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import { Link as RouterLink, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import {
  Text,
  Flex,
  Image,
  Box,
  Grid,
  Spinner,
  Heading,
  Button,
  Divider,
} from '@chakra-ui/core';

import heroBg from '../../assets/images/bg.png';
import heroBgLg from '../../assets/images/bg-lg.png';
import logoSrc from '../../assets/images/logo.png';
import certificateSrc from '../../assets/images/certificate.png';

import {
  FcComboChart,
  FcManager,
  FcCurrencyExchange,
  FcPositiveDynamic,
  FcConferenceCall,
  FcAssistant,
  FcIdea,
} from 'react-icons/fc';
import { motion } from 'framer-motion';

import Plan from '../../components/Investment/plan';
const Faq = lazy(() => import('./faq'));

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);
const MotionHeading = motion.custom(Heading);
const MotionText = motion.custom(Text);

const cryptoVariant = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6,
    },
  },
};

const stagger = {
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const fadeInUp = {
  initial: {
    opacity: 0,
    y: 80,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.7,
      stiffness: 260,
      damping: 20
    }
  },
};

const LandingPage = () => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const scrollTo = (ref) => window.scrollTo(0, ref.current.offsetTop);
  let crypto = [
    { id: 'bitcoin', label: 'Bitcoin', price: '9,451.71' },
    { id: 'ethereum', label: 'Ethereum', price: '237.19' },
    { id: 'bitcoin-cash', label: 'Bitcoin Cash', price: '240.20' },
  ];

  const [bitcoin, setBitcoin] = useState();
  const [ethereum, setEthereum] = useState();
  const [bitcoinCash, setBitCoinCash] = useState();

  const renderCrypto = crypto.map((c, i) => {
    return (
      <MotionBox
        flex={'1'}
        key={c.id}
        as='li'
        ml={{ lg: '3rem' }}
        textAlign='center'
        d={{ lg: 'flex' }}
        flexDirection={{ lg: 'column' }}
        variants={cryptoVariant}
      >
        <Text
          mb='-1px'
          color={'#c2c9d5'}
          fontWeight='normal'
          fontSize={{ base: '.8rem', lg: '1rem' }}
          whiteSpace='nowrap'
        >
          {c.label}
        </Text>
        <Text
          color={'white'}
          fontSize={{ base: '.85rem', lg: '1rem' }}
          fontWeight={'500'}
        >
          {c.id === 'bitcoin' && bitcoin && `$${bitcoin}`}
          {c.id === 'ethereum' && ethereum && `$${ethereum}`}
          {c.id === 'bitcoin-cash' && bitcoinCash && `$${bitcoinCash}`}
        </Text>
      </MotionBox>
    );
  });

  const benefits = [
    { icon: FcComboChart, label: 'Earn Profit Hourly' },
    { icon: FcCurrencyExchange, label: 'Deposit as low as $100' },
    { icon: FcConferenceCall, label: '50+ Expert traders' },
    { icon: FcPositiveDynamic, label: 'Long term program' },
  ];

  const whyChooseUs = [
    {
      title: 'Easy to use',
      icon: FcIdea,
      content:
        "Whether you are a beginner or a veteran in the online investment field, we are sure that you will find our platform easy to use. It's designed to be easy to navigate on every device.",
    },
    {
      title: 'Professional Team',
      icon: FcManager,
      content:
        'We have a team of experienced and qualified financial analysts who are developing new strategies.',
    },
    {
      title: '24/7 Support',
      icon: FcAssistant,
      content:
        'We provide unbeatable support service through mail support and livechat to cater for your needs and give a professional, fast and effectively response. Phone support is provided 24/7 for our VIP members!',
    },
  ];

  const urls = [
    'https://api.coincap.io/v2/assets/bitcoin',
    'https://api.coincap.io/v2/assets/ethereum',
    'https://api.coincap.io/v2/assets/bitcoin-cash',
  ];

  useEffect(() => {
    async function getLiveCryptoPrices() {
      const request = urls.map(async (url) => axios(url));
      const responses = await Promise.all(request);
      const [res1, res2, res3] = responses;
      setBitcoin((+res1.data.data.priceUsd).toFixed(2));
      setEthereum((+res2.data.data.priceUsd).toFixed(2));
      setBitCoinCash((+res3.data.data.priceUsd).toFixed(2));
    }
    getLiveCryptoPrices();
  }, [urls]);

  return (
    <Box bg={'#F9F9F9'} minH='100vh' ref={homeRef}>
      <Box as='header' bg='#152136' p={'1rem 0'}>
        <div className='wrapper'>
          <Flex padding={'0'} as='nav' justify={'space-between'} align='center'>
            <Box size={{ lg: '25%' }}>
              <Image src={logoSrc} alt='' size='100%' />
            </Box>
            <Box d={{ base: 'none', lg: 'flex' }}>{renderCrypto}</Box>
            <div
              style={{ marginLeft: 'auto' }}
              className='js-ga bklyn-btn-holder bklyn-btn-last bklyn-btn-center button button--primary button--arrow button--mobile-block button--bold ml0 mr0'
              id='google_translate_element'
            >
              <div className='close-search-suggestions'>
                <i className='os-icon os-icon-x'></i>
              </div>
            </div>
          </Flex>
          <Divider style={{ opacity: '.1' }} d={{ lg: 'none' }} />
          <Box d={{ lg: 'none' }}>
            <MotionFlex
              as='ul'
              p='0'
              m='0'
              style={{ listStyle: 'none' }}
              align='center'
              justify={'space-around'}
              color={'white'}
              variants={stagger}
              initial='initial'
              animate='animate'
            >
              {renderCrypto}
            </MotionFlex>
          </Box>
        </div>
      </Box>

      <Suspense
        fallback={
          <Grid
            pos='0'
            h='100vh'
            style={{ placeItems: 'center' }}
            gap={5}
            bg='#152136'
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='yellow.500'
              size='xl'
            />
          </Grid>
        }
      >
        {/* FAQs */}
        <Switch>
          <Route path='/faqs' component={Faq} />
          <Route path='/'>
            <Box
              as='section'
              bgImage={{ base: `url(${heroBg})`, md: `url(${heroBgLg})` }}
              bgSize={'cover'}
              bgPos={{
                base: 'bottom center',
                md: 'center',
                lg: 'top center',
              }}
              textAlign={'center'}
              minH='85vh'
            >
              <MotionBox
                pt={{ base: '10vh', md: '15vh', lg: '20vh' }}
                px={'20px'}
                maxW='600px'
                margin='0 auto'
                variants={stagger}
                initial='initial'
                animate='animate'
              >
                <MotionHeading
                  fontWeight='bold'
                  lineHeight='40px'
                  color={'white'}
                  fontSize='calc(2rem + 1vw)'
                  textShadow='xl'
                  mb='20px'
                  variants={fadeInUp}
                >
                  Profit generated Like{' '}
                  <span style={{ color: '#F3703A' }}>Expert</span> Traders
                </MotionHeading>

                <MotionHeading
                  fontSize='18px'
                  fontWeight='normal'
                  lineHeight='25px'
                  textShadow='md'
                  color='white'
                  mb={6}
                  variants={fadeInUp}
                >
                  Nextdecademiners Experts help you make Massive profit hourly
                </MotionHeading>
                <MotionBox mx='auto' maxW={'16rem'} variants={fadeInUp}>
                  <RouterLink to='/auth/signup'>
                    <Button
                      boxShadow='0 8px 16px rgba(0,0,0,.3)'
                      borderRadius='4px'
                      h='50px'
                      w='full'
                      bg='#F3703A'
                      lineHeight='50px'
                      my={{ base: 6, md: 8 }}
                      color={'white'}
                      fonWeight={'bold'}
                      fontSize={'18px'}
                      maxW='260px'
                      _hover={{ color: '#F3703A', bg: '#FFF' }}
                    >
                      Get Started
                    </Button>
                  </RouterLink>
                </MotionBox>
                <MotionText
                  fontSize={{ base: 'md', md: 'xl' }}
                  lineHeight='18px'
                  color='white'
                  textAlign='center'
                  fontWeight='normal'
                  variants={fadeInUp}
                >
                  CEO of nextdecademiners.com <br />
                  <b>Bryan Simon</b>
                </MotionText>
              </MotionBox>
            </Box>

            <Grid
              templateColumns={`
        repeat(auto-fit, minmax(220px, 1fr))
      `}
              p={'3rem 0'}
              borderRadius={'8px'}
              shadow={'md'}
              mt={'-15vh'}
              mx={'auto'}
              bg={'white'}
              className='wrapper'
            >
              {benefits.map((b, i) => (
                <Flex key={i} p={'0 1.6rem'} my={6} align={'center'}>
                  <Box as={b.icon} size='60px' mr='24px' />
                  <Text fontSize={'xl'} lineHeight={'short'} fontWeight='500'>
                    {b.label}
                  </Text>
                </Flex>
              ))}
            </Grid>

            <Box my={10} textAlign={'center'} py={4}>
              <Heading fontSize='calc(1rem + 1vw)' color='#000'>
                Since
              </Heading>
              <Text fontSize={'2xl'}>December 1st, 2019</Text>
            </Box>
            <Box textAlign={'center'} mx={'auto'} className='wrapper'>
              <Heading fontSize='calc(1rem + 1vw)' mb={8} color='#000'>
                Choose An Investment Plan
              </Heading>
              <Plan />
            </Box>
            <Grid
              mt={8}
              pt={8}
              rowGap={5}
              templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
              alignItems='center'
              className='wrapper'
              mx={4}
              ref={aboutRef}
            >
              <Heading
                textAlign={'center'}
                gridColumn={'1 / -1'}
                mb={4}
                color='#000'
                fontSize='calc(1rem + 1vw)'
                id='about-us'
              >
                About Nextdecademiners.com
              </Heading>
              <Box borderRight={{ lg: '1px solid #eee' }} pr={{ lg: 3 }}>
                <Text fontSize={'18px'} lineHeight={'32px'}>
                  Nextdecademiners.com is United Kingdom registered company,
                  (Company Number: 06416732, Enterprise House, 2 Pass Street,
                  Oldham, Manchester, United Kingdom, OL9 6HZ.). We are a 24/7
                  crypto-currency trading platform that works automatically, and
                  it has been registered in the UK company, we offer a
                  no-experience trading method to help you remove unnecessary
                  risks. Over the past two years, our experts have come up with
                  a workable automated arbitrage trading software from manual
                  strategic trading that can help you earn a lot of money. In
                  2019, we made a record of $1 million per day. From spot
                  trading, futures trading and investment ICO project, we
                  invested TRX and NEO heavily through our analysis and earned
                  tens of millions of dollars. we are accept Bitcoin, Ethereum
                  and Bitcoin Cash.
                </Text>
              </Box>
              <Box textAlign={'center'} p={{ base: 6 }}>
                <Heading
                  fontSize='calc(.6rem + 1vw)'
                  color={'#602c16'}
                  textAlign={'center'}
                >
                  COMPANY NUMBER - UK
                </Heading>
                <Text fontSize={'40px'} fontWeight={'500'}>
                  06416732
                </Text>
              </Box>
            </Grid>
            <Box py='4rem' mx='auto' bg='#152136'>
              <Image w='full' maxW='400px' mx='auto' src={certificateSrc} alt='Nextdecademiners company certificate' />
            </Box>
            <Box bg='white' shadow='md' borderRadius='.6rem' p='3rem' my='4rem'>
              <Heading
                fontSize='calc(1rem + 1vw)'
                color='#000'
                mb={{ base: '4rem' }}
                textAlign={'center'}
              >
                Why Choose Nextdecademiners.com?
              </Heading>
              <Grid
                gap={10}
                templateColumns={'repeat(auto-fit, minmax(240px, 1fr))'}
                pos='relative'
                className='wrapper'
              >
                {whyChooseUs.map((_, i) => (
                  <Flex direction='column' key={i}>
                    <Box as={_.icon} size='5rem' mb='1rem' />
                    <Heading mb={3} fontSize={'20px'} fontWeight='500'>
                      {_.title}
                    </Heading>
                    <Text fontSize='18px'>{_.content}</Text>
                  </Flex>
                ))}
              </Grid>
              <Box w='full' mx='auto' maxW={'480px'}>
                <Button
                  boxShadow='0 4px 8px rgba(0,0,0,.1)'
                  borderRadius='4px'
                  h='4rem'
                  w='100%'
                  bg='#F3703A'
                  lineHeight='4rem'
                  margin='4rem auto'
                  color={'white'}
                  fonWeight={'bold'}
                  fontSize={'20px'}
                  _hover={{ color: '#F3703A', bg: '#FFF' }}
                >
                  <RouterLink to='/auth/signup'>Get Started Now!</RouterLink>
                </Button>
              </Box>
            </Box>
          </Route>
        </Switch>
      </Suspense>
      <Box bg={'#152136'} as='footer' py={6} color={'white'}>
        <Grid
          templateColumns='repeat(auto-fit, minmax(200px, 1fr))'
          className='wrapper'
          gap={4}
        >
          <Box as='ul' my={9} fontSize={'14px'} lineHeight={'24px'}>
            <Heading fontWeight={'500'} fontSize={'15px'}>
              LINK
            </Heading>

            <Text color={'#b7c0d1'} as='li' onClick={() => scrollTo(homeRef)}>
              Home
            </Text>

            <Text color={'#b7c0d1'} as='li' onClick={() => scrollTo(aboutRef)}>
              About us
            </Text>
            <RouterLink to='/faqs'>
              <Text color={'#b7c0d1'} as='li'>
                FAQs
              </Text>
            </RouterLink>
          </Box>
          <Box as='ul' my={9}>
            <Heading fontWeight={'500'} fontSize={'15px'}>
              LOCATION
            </Heading>
            <Text
              as='li'
              lineHeight={'24px'}
              fontSize={'14px'}
              fontWeight={'400'}
              color={'#b7c0d1'}
            >
              Enterprise House, 2 Pass Street, Oldham, Manchester, United
              Kingdom, OL9 6HZ.
            </Text>
          </Box>
          <Box as='ul' my={9}>
            <Heading fontWeight={'500'} fontSize={'15px'}>
              CONTACT
            </Heading>
            <Text
              fontSize={'14px'}
              lineHeight={'24px'}
              as='li'
              fontWeight={'400'}
              color={'#b7c0d1'}
            >
              admin@nextdecademiners.com (Phone support provided for VIP Members
              only)
            </Text>
          </Box>
          <Box mt={5} color={'#b7c0d1'}>
            <RouterLink to='/'>
              <Image src={logoSrc} alt='' />
            </RouterLink>
            <Text lineHeight={3} fontSize={'12px'}>
              &copy; 2020 NEXTDECADEMINERS.COM
            </Text>
            <Text fontSize={'12px'}>v.1.2.0</Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingPage;
