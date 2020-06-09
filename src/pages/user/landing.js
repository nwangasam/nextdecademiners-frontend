import React, { useState, useEffect } from "react";
import { Link, Route } from 'react-router-dom';
import {
  Text,
  Flex,
  Image,
  Box,
  Grid,
  Heading,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
  Icon,
} from "@chakra-ui/core";

import heroBg from "../../assets/images/bg.png";
import logoSrc from "../../assets/images/site-logo.png";

import {
  FcComboChart,
  FcCurrencyExchange,
  FcPositiveDynamic,
  FcConferenceCall,
} from "react-icons/fc";
import { ReactComponent as MobileToggle } from "../../assets/images/mobile-toggle.svg";

const LandingPage = () => {
  const crypto = [
    { id: "bitcoin", label: "Bitcoin", price: "8,500" },
    { id: "ethereum", label: "Ethereum", price: "389" },
    { id: "bitcoin-cash", label: "Bitcoin Cash", price: "8,500" },
  ];

  const benefits = [
    { icon: FcComboChart, label: "Earn Profit Hourly" },
    { icon: FcCurrencyExchange, label: "Deposit as low as $100" },
    { icon: FcConferenceCall, label: "50+ Expert traders" },
    { icon: FcPositiveDynamic, label: "Long term program" },
  ];

  const plans = [
    {
      label: "BRONZE PLAN",
      interest: "1.4",
      duration: "24hr",
      features: ["Instant withdrawal", "Bitcoin, Ethereum & Bitcoin Cash"],
      priceRange: ["100", "499"],
    },
    {
      label: "SILVER PLAN",
      interest: "6",
      duration: "65min",
      features: ["Instant withdrawal", "Bitcoin, Ethereum & Bitcoin Cash"],
      priceRange: ["500", "2999"],
    },
    {
      label: "GOLD PLAN",
      interest: "10",
      duration: "24hr",
      features: ["Instant withdrawal", "Bitcoin, Ethereum & Bitcoin Cash"],
      priceRange: ["3000", "9999"],
    },
    {
      label: "PLATINUM PLAN",
      interest: "15",
      duration: "7d",
      features: ["Instant withdrawal", "Bitcoin, Ethereum & Bitcoin Cash"],
      priceRange: ["10000", "100000"],
    },
  ];

  const whyChooseUs = [
    {
      title: "Easy to use",
      content:
        "Whether you are a beginner or a veteran in the online investment field, we are sure that you will find our platform easy to use. IT's designed to be easy to navigate on every device.",
    },
    {
      title: "Professional Team",
      content:
        "We have a team of experienced and qualified financial analysts who are developing new strategies.",
    },
    {
      title: "24/7 Support",
      content:
        "We provide unbeatable support service through mail s upportr and livechat to cater yo uneeds and give a professional, fast and effectively response. Phone support is provided 24/7 hours for our VIP members!",
    },
  ];

  return (
    <Box bg={"#F5F5F5"} minH="100vh">
      <Box as="header" boxShadow="" bg="#152136" p={"8px 16px"}>
        <div className="wrapper">
          <Flex as="nav" justify={"space-between"} align="center">
            <Box>
              <Image src={logoSrc} alt="" />
            </Box>
            <Box color={"white"}>
              <MobileToggle />
            </Box>
          </Flex>
          <Divider borderColor={"rgba(225, 225, 225, .1)"} />
          <Flex
            as="ul"
            p="0"
            m="0"
            style={{ listStyle: "none" }}
            align="center"
            justify={"space-around"}
            color={"white"}
          >
            {crypto.map((c, i) => (
              <Box flex={"1"} key={c.id} as="li" textAlign="center">
                <Text
                  mb="-1px"
                  color={"#c2c9d5"}
                  fontWeight="normal"
                  fontSize={{ base: "16px", lg: 5 }}
                >
                  {c.label}
                </Text>
                <Text
                  color={""}
                  fontSize={{ base: "16px", lg: 5 }}
                  fontWeight={"500"}
                >
                  ${c.price}
                </Text>
              </Box>
            ))}
          </Flex>
        </div>
      </Box>
      <Box
        as="section"
        bgImage={`url(${heroBg})`}
        bgSize={"cover"}
        bgPos={{ base: "bottom center", md: "center", lg: "top center" }}
        textAlign={"center"}
        minH="75vh"
      >
        <Box pt={{ base: "10vh", lg: "20vh" }} px={"20px"}>
          <Heading
            fontWeight="bold"
            lineHeight="36px"
            color={"white"}
            fontSize="calc(2rem + 1vw)"
            textShadow="md"
            mb="20px"
          >
            Profit generated Like{" "}
            <span style={{ color: "#F3703A" }}>Expert</span> Traders
          </Heading>
          <Heading
            fontSize="18px"
            fontWeight="normal"
            lineHeight="25px"
            color="white"
            mb={6}
          >
            Nextdecademiners Experts help you make Massive profit hourly
          </Heading>
          <Button
            boxShadow="0 8px 16px rgba(0,0,0,.3)"
            borderRadius="4px"
            h="50px"
            w="full"
            bg="#F3703A"
            lineHeight="50px"
            mb="18px"
            color={"white"}
            fonWeight={"bold"}
            fontSize={"18px"}
            maxW="260px"
            _hover={{ color: "#F3703A", bg: "#FFF" }}
          >
            <Link to='/auth/signup'>
            Get Started
            </Link>
          </Button>
          <Text
            fontSize="14px"
            lineHeight="18px"
            color="white"
            textAlign="center"
            fontWeight="normal"
          >
            CEO of nextdecademiners.com <br />
            <b>Bryan Simon</b>
          </Text>
        </Box>
      </Box>
      <div className="wrapper">
        <Grid
          templateColumns={`
        repeat(auto-fit, minmax(220px, 1fr))
      `}
          p={"1rem 0"}
          borderRadius={"8px"}
          shadow={"md"}
          mt={"-80px"}
          mx={"1rem"}
          bg={"white"}
        >
          {benefits.map((b, i) => (
            <Flex key={i} p={"0 1.6rem"} my={6} align={"center"}>
              <Box as={b.icon} size="60px" mr="24px" />
              <Text fontSize={"xl"} lineHeight={"short"} fontWeight="500">
                {b.label}
              </Text>
            </Flex>
          ))}
        </Grid>
        <Box my={10} textAlign={"center"}>
          <Heading fontSize={"18px"}>SINCE</Heading>
          <Text fontSize={"2xl"}>December 1st, 2018</Text>
        </Box>
        <Box textAlign={"center"} maxW={"1140px"} mx={"auto"}>
          <Heading fontSize="18px" mb={8} color={"#602c16"}>
            CHOOSE AN INVESTMENT PLAN
          </Heading>
          <Grid
            templateColumns={`
        repeat(auto-fit, minmax(240px, 1fr))
      `}
            gap={4}
          >
            {plans.map((p, i) => (
              <Flex
                key={i}
                textAlign={"center"}
                direction="column"
                borderRadius={"8px"}
                p={6}
                border={"1px solid #CBCBCB"}
                bg={'white'}
                boxShadow='inset 0 4px 12px rgba(0,0,0,.15)'
              >
                <Text
                  mb={4}
                  color={"#602c16"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  letterSpacing={"2px"}
                >
                  {p.label}
                </Text>
                <Text
                  mb={8}
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  color={"#152136"}
                >
                  {p.interest}%
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      marginLeft: "4px",
                      color: 'gray'
                    }}
                  >
                    /{p.duration}
                  </span>
                </Text>
                <List spacing={3} as="ul" mb={4} lineHeight={1}>
                  {p.features.map((l) => (
                    <ListItem>
                      <ListIcon icon="check" color="#152136" />
                      {l}
                    </ListItem>
                  ))}
                  <ListItem fontWeight={"bold"}>
                    <ListIcon icon="check" color="#152136" />${p.priceRange[0]}{" "}
                    - ${p.priceRange[1]}
                  </ListItem>
                </List>
                <Button
                  rounded="full"
                  mx="auto"
                  w={"140px"}
                  fontSize={"12px"}
                  fontWeight={"normal"}
                  variant={"outline"}
                  color={"#F3703A"}
                  variantColor={"orange"}
                >
                  SIGN UP
                </Button>
              </Flex>
            ))}
          </Grid>
        </Box>
        <Grid mt={16} gap={5} templateColumns={{ base: "1fr", lg: "2fr 1fr" }}>
          <Heading
            textAlign={"center"}
            gridColumn={"1 / -1"}
            fontSize="18px"
            mb={8}
            color={"#602c16"}
          >
            ABOUT NEXTDECADEMINERS.COM
          </Heading>
          <Box>
            <Text fontSize={"16px"} lineHeight={"26px"}>
              Nextdecademiners.com is United Kingdom registered company,
              (Company Number: 06416732, Enterprise House, 2 Pass Street,
              Oldham, Manchester, United Kingdom, OL9 6HZ.). We are an 7/24
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
          <Box textAlign={"center"} p={{ base: 6 }}>
            <Heading fontSize={"18px"} color={"#602c16"} textAlign={"center"}>
              COMPANY NUMBER - UK
            </Heading>
            <Text fontSize={"40px"} fontWeight={"500"}>
              06416732
            </Text>
          </Box>
        </Grid>
        <Box>
          <Heading
            fontSize={"18px"}
            color={"#602c16"}
            mb={{ base: 8 }}
            textAlign={"center"}
          >
            WHY CHOOSE NEXTDECADEMINERS.COM?
          </Heading>
          <Grid
            gap={6}
            templateColumns={"repeat(auto-fit, minmax(240px, 1fr))"}
          >
            {whyChooseUs.map((_, i) => (
              <Box key={i} pl={{ base: 9 }}>
                <Heading mb={3} fontSize={"17px"} fontWeight="500">
                  {_.title}
                </Heading>
                <Text>{_.content}</Text>
              </Box>
            ))}
          </Grid>
          <Button
            boxShadow="0 4px 8px rgba(0,0,0,.1)"
            borderRadius="4px"
            h="50px"
            w="full"
            bg="#F3703A"
            lineHeight="50px"
            my={8}
            color={"white"}
            fonWeight={"bold"}
            fontSize={"20px"}
            maxW={"280px"}
            ml="2rem"
            _hover={{ color: "#F3703A", bg: "#FFF" }}
          >
           <Link to='/auth/signup'>
            Get Started
            </Link>
          </Button>
        </Box>
      </div>
      <Box bg={"#152136"} as="footer" py={6} color={"white"}>
        <div className="wrapper">
          <Flex wrap="wrap" justify={"space-between"}>
            <Box as="ul" my={9} fontSize={"14px"} lineHeight={"24px"}>
              <Heading fontWeight={"500"} fontSize={"15px"}>
                LINK
              </Heading>
              <Text color={"#b7c0d1"} as="li">
                Home
              </Text>
              <Text color={"#b7c0d1"} as="li">
                About us
              </Text>
              <Text color={"#b7c0d1"} as="li">
                FAQs
              </Text>
            </Box>
            <Box as="ul" my={9}>
              <Heading fontWeight={"500"} fontSize={"15px"}>
                LOCATION
              </Heading>
              <Text
                as="li"
                lineHeight={"24px"}
                fontSize={"14px"}
                fontWeight={"400"}
                color={"#b7c0d1"}
              >
                Enterprise House, 2 Pass Street, Oldham, Manchester, United
                Kingdom, OL9 6HZ.
              </Text>
            </Box>
            <Box as="ul" my={9}>
              <Heading fontWeight={"500"} fontSize={"15px"}>
                CONTACT
              </Heading>
              <Text
                fontSize={"14px"}
                lineHeight={"24px"}
                as="li"
                fontWeight={"400"}
                color={"#b7c0d1"}
              >
                admin@nextdecademiners.com (Phone support provided for VIP
                Members only)
              </Text>
            </Box>
            <Box mt={5} color={"#b7c0d1"}>
              <Image src={logoSrc} alt="" />
              <Text lineHeight={3} fontSize={"12px"}>
                &copy; 2020 NEXTDECADEMINERS.COM
              </Text>
              <Text fontSize={"12px"}>v.1.2.0</Text>
            </Box>
          </Flex>
        </div>
      </Box>
    </Box>
  );
};

export default LandingPage;
