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
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { ReactComponent as BitcoinCash } from '../../assets/images/bitcoin-cash.svg';
import { motion } from 'framer-motion';

import Plan from '../../components/Investment/plan';
const Faq = lazy(() => import('./faq'));

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);
const MotionHeading = motion.custom(Heading);
// const MotionText = motion.custom(Text);

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
      staggerChildren: 0.4,
    },
  },
};

const LandingPage = () => {
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const scrollTo = (ref) => window.scrollTo(0, ref.current.offsetTop);
  let crypto = [
    {
      id: 'bitcoin',
      label: 'Bitcoin',
      price: '9,451.71',
      icon: FaBitcoin,
      color: 'orange',
    },
    {
      id: 'ethereum',
      label: 'Ethereum',
      price: '237.19',
      icon: FaEthereum,
      color: 'gray',
    },
    {
      id: 'bitcoin-cash',
      label: 'Bitcoin Cash',
      price: '240.20',
      color: 'yellow',
      icon: BitcoinCash,
    },
  ];

  const [bitcoin, setBitcoin] = useState();
  const [ethereum, setEthereum] = useState();
  const [bitcoinCash, setBitCoinCash] = useState();

  const renderCrypto = crypto.map((c, i) => {
    return (
      <MotionBox
        flex={'1'}
        key={c.id + Math.random()}
        as='li'
        ml={{ lg: '2.4rem' }}
        w='full'
        d={{ lg: 'flex' }}
        justifyContent="center"
        variants={cryptoVariant}
        display='flex'
        alignItems='center'
      >
        <Box as={c.icon} size='28px' mr={1} color={`${c.color}.400`}></Box>
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

  useEffect(() => {
    async function getLiveCryptoPrices() {
      const urls = [
        'https://api.coincap.io/v2/assets/bitcoin',
        'https://api.coincap.io/v2/assets/ethereum',
        'https://api.coincap.io/v2/assets/bitcoin-cash',
      ];
      const request = urls.map(async (url) => axios(url));
      const responses = await Promise.all(request);
      const [res1, res2, res3] = responses;
      setBitcoin((+res1.data.data.priceUsd).toFixed(2));
      setEthereum((+res2.data.data.priceUsd).toFixed(2));
      setBitCoinCash((+res3.data.data.priceUsd).toFixed(2));
    }
    getLiveCryptoPrices();
  }, []);

  return (
    <Box bg={'#F9F9F9'} minH='100vh' ref={homeRef}>
      <MotionBox
        as='header'
        pos='absolute'
        w='full'
        className='header'
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -74, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.5, -0.01, 0.04, 0.9] }}
      >
        <Flex padding={'0'} as='nav' justify={'space-between'} w='full' align='center'>
          <Box w={{ lg: '340px' }} mx={{ base: 'auto', md: '0px' }}>
            <Image src={logoSrc} alt='' w='full' />
          </Box>
          <Box d={{ base: 'none', lg: 'flex' }}>{renderCrypto}</Box>
        </Flex>
        <Divider style={{ opacity: '.1' }} d={{ lg: 'none' }} />
        <Box d={{ lg: 'none' }}  ml={{ lg: 'auto'}} w='full'>
          <MotionFlex
            as='ul'
            p='0'
            m='0'
            style={{ listStyle: 'none' }}
            align='center'
            color={'white'}
            variants={stagger}
            initial='initial'
            animate='animate'
          >
            {renderCrypto}
          </MotionFlex>
        </Box>
      </MotionBox>

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
            <MotionBox
              as='section'
              bgImage={{ base: `url(${heroBg})`, md: `url(${heroBgLg})` }}
              bgSize={'cover'}
              bgPos={{
                base: 'center',
                md: 'top center',
              }}
              textAlign={'left'}
              minH='100vh'
            >
              <MotionBox
                className='wrapper'
                pt={{ base: '20vh', md: '25vh' }}
                px={{ base: '20px', lg: '0' }}
                textAlign='center'
                variants={stagger}
                initial='initial'
                animate='animate'
              >
                <MotionHeading
                  fontWeight='bold'
                  lineHeight='1.2'
                  color={'white'}
                  fontSize='calc(2.4rem + 1.2vw)'
                  textShadow='xl'
                  mb={6}
                  variants={fadeInUp}
                >
                  Generate profit trading <br /> crypto with{' '}
                  <Box as={'span'} color='#F3703A'>
                    Experts
                  </Box>
                </MotionHeading>

                <MotionHeading
                  fontSize='20px'
                  fontWeight='normal'
                  lineHeight='1.54'
                  textShadow='md'
                  maxW={'438px'}
                  mx='auto'
                  color='white'
                  mb={6}
                  variants={fadeInUp}
                >
                  Nextdecademiners Experts help you make Massive profit hourly
                </MotionHeading>
                <MotionBox maxW={'320px'} mx='auto' variants={fadeInUp}>
                  <RouterLink to='/auth/signup'>
                    <Button
                      boxShadow='0 8px 16px rgba(0,0,0,.3)'
                      h='64px'
                      w='full'
                      bg='#F3703A'
                      lineHeight='50px'
                      my={{ base: 4, md: 6 }}
                      color={'white'}
                      fonWeight={'bold'}
                      letterSpacing={'1.4px'}
                      fontSize={'18px'}
                      _hover={{ color: '#F3703A', bg: '#FFF' }}
                    >
                      GET STARTED
                    </Button>
                  </RouterLink>
                </MotionBox>
                {/* <MotionText
                  fontSize={{ base: 'md', md: 'xl' }}
                  lineHeight='1.4'
                  color='white'
                  textAlign='left'
                  fontWeight='normal'
                  variants={fadeInUp}
                >
                  CEO of nextdecademiners.com <br />
                  <b>Bryan Simon</b>
                </MotionText> */}
              </MotionBox>
            </MotionBox>

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
                <Flex key={i + Math.random()} p={'0 1.6rem'} my={6} align={'center'}>
                  <Box as={b.icon} size='60px' mr='24px' />
                  <Text fontSize={'xl'} lineHeight={'short'} fontWeight='500'>
                    {b.label}
                  </Text>
                </Flex>
              ))}
            </Grid>

            <Box my={10} textAlign={'center'} py={4}>
              <Heading
                fontSize='calc(2rem + 1vw)'
                color='#000'
                textTransform={'uppercase'}
              >
                Since
              </Heading>
              <Text fontSize={'2xl'}>December 1st, 2019</Text>
            </Box>
            <Box textAlign={'center'} mx={'auto'} className='wrapper'>
              <Heading
                fontSize='calc(2rem + 1vw)'
                mb={8}
                color='#000'
                textTransform={'uppercase'}
              >
                Choose An Investment Plan
              </Heading>
              <Plan />
            </Box>
            <Grid
              className='wrapper'
              my={8}
              pt={8}
              rowGap={5}
              templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
              alignItems='center'
              mx='auto'
              ref={aboutRef}
            >
              <Heading
                id='about-us'
                textAlign={'center'}
                gridColumn={'1 / -1'}
                mb={4}
                fontSize='calc(2rem + 1vw)'
                color='#000'
                textTransform={'uppercase'}
              >
                About us
              </Heading>
              <Box borderRight={{ lg: '1px solid #eee' }} pr={{ lg: 5 }}>
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
              <Image
                w='full'
                maxW='400px'
                mx='auto'
                src={certificateSrc}
                alt='Nextdecademiners company certificate'
              />
            </Box>
            <Box bg='white' shadow='md' borderRadius='.6rem' p='3rem' my='4rem'>
              <Heading
                mb={{ base: '4rem' }}
                textAlign={'center'}
                fontSize='calc(2rem + 1vw)'
                color='#000'
                textTransform={'uppercase'}
              >
                Why Choose Us?
              </Heading>
              <Grid
                gap={10}
                templateColumns={'repeat(auto-fit, minmax(240px, 1fr))'}
                pos='relative'
                className='wrapper'
              >
                {whyChooseUs.map((_, i) => (
                  <Flex direction='column' key={i + Math.random()}>
                    <Box as={_.icon} size='5rem' mb='1rem' />
                    <Heading mb={3} fontSize={'20px'} fontWeight='500'>
                      {_.title}
                    </Heading>
                    <Text fontSize='18px'>{_.content}</Text>
                  </Flex>
                ))}
              </Grid>
              <Box maxW={'320px'} mx='auto'>
                <RouterLink to='/auth/signup'>
                  <Button
                    boxShadow='0 8px 16px rgba(0,0,0,.3)'
                    h='64px'
                    w='full'
                    bg='#F3703A'
                    lineHeight='50px'
                    my={{ base: 4, md: 6 }}
                    color={'white'}
                    fonWeight={'bold'}
                    letterSpacing={'1.4px'}
                    fontSize={'18px'}
                    _hover={{ color: '#F3703A', bg: '#FFF' }}
                  >
                    GET STARTED NOW
                  </Button>
                </RouterLink>
              </Box>
            </Box>
            <Grid
              p={'1.2rem 1rem 2rem'}
              mx='auto'
              className='wrapper'
              templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
              gap='2rem'
            >
              <Box
                as='iframe'
                height={{ base: '51vw', lg: '320px' }}
                w='full'
                src='https://www.youtube.com/embed/Um63OQz3bjo'
                frameborder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></Box>
              <Box
                as='iframe'
                height={{ base: '51vw', lg: '320px' }}
                w='full'
                src='https://www.youtube.com/embed/RKBczGEcP10'
                frameborder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></Box>
            </Grid>
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
          <Box id="google_translate_element"></Box>
        </Grid>

      </Box>
    </Box>
  );
};

export default LandingPage;
