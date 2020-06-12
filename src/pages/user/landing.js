import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Text,
  Flex,
  Image,
  Box,
  Grid,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/core";

import heroBg from "../../assets/images/bg.png";
import logoSrc from "../../assets/images/logo.png";
import {
  FcComboChart,
  FcCurrencyExchange,
  FcPositiveDynamic,
  FcConferenceCall,
} from "react-icons/fc";

import Plan from "../../components/Investment/plan";

const LandingPage = () => {
  const crypto = [
    { id: "bitcoin", label: "Bitcoin", price: "8,500" },
    { id: "ethereum", label: "Ethereum", price: "389" },
    { id: "bitcoin-cash", label: "Bitcoin Cash", price: "8,500" },
  ];

  const renderCrypto = crypto.map((c, i) => (
    <Box
      flex={"1"}
      key={c.id}
      as="li"
      ml={{ lg: "3rem" }}
      textAlign="center"
      d={{ lg: "flex" }}
      flexDirection={{ lg: "column" }}
    >
      <Text
        mb="-1px"
        color={"#c2c9d5"}
        fontWeight="normal"
        fontSize={{ base: ".95rem", lg: "1.05rem" }}
        whiteSpace="nowrap"
      >
        {c.label}
      </Text>
      <Text
        color={"white"}
        fontSize={{ base: ".95rem", lg: "1.05rem" }}
        fontWeight={"500"}
      >
        ${c.price}
      </Text>
    </Box>
  ));

  const benefits = [
    { icon: FcComboChart, label: "Earn Profit Hourly" },
    { icon: FcCurrencyExchange, label: "Deposit as low as $100" },
    { icon: FcConferenceCall, label: "50+ Expert traders" },
    { icon: FcPositiveDynamic, label: "Long term program" },
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
      <Box as="header" boxShadow="" bg="#152136" p={"8px 0"}>
        <div className="wrapper">
          <Flex padding={"0"} as="nav" justify={"space-between"} align="center">
            <Box>
              <Image src={logoSrc} alt="" />
            </Box>
            <Box d={{ base: "none", lg: "flex" }}>{renderCrypto}</Box>
            <Box color={"white"} d={{ base: "inline-block", lg: "none" }}>
              <RouterLink to="/auth/signup">
                <Button
                  size="sm"
                  variant="outline"
                  variantColor="orange.400"
                  color="orange.400"
                >
                  Get Started
                </Button>
              </RouterLink>
            </Box>
          </Flex>
          <Divider style={{ opacity: ".1" }} d={{ lg: "none" }} />
          <Box d={{ lg: "none" }}>
            <Flex
              as="ul"
              p="0"
              m="0"
              style={{ listStyle: "none" }}
              align="center"
              justify={"space-around"}
              color={"white"}
            >
              {renderCrypto}
            </Flex>
          </Box>
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
            <RouterLink to="/auth/signup">Get Started</RouterLink>
          </Button>
          <Text
            fontSize={{ base: "md", md: "xl" }}
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
          <Heading fontSize={"18px"} color={"#602c16"}>
            SINCE
          </Heading>
          <Text fontSize={"2xl"}>December 1st, 2018</Text>
        </Box>
        <Box textAlign={"center"} maxW={"1140px"} mx={"auto"}>
          <Heading fontSize="18px" mb={8} color={"#602c16"}>
            CHOOSE AN INVESTMENT PLAN
          </Heading>
          <Plan />
        </Box>
        <Grid
          mt={16}
          rowGap={5}
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          alignItems="center"
          mx={4}
        >
          <Heading
            textAlign={"center"}
            gridColumn={"1 / -1"}
            fontSize="18px"
            mb={4}
            color={"#602c16"}
          >
            ABOUT NEXTDECADEMINERS.COM
          </Heading>
          <Box borderRight={{ lg: "1px solid #eee" }} pr={{ lg: 3 }}>
            <Text fontSize={"18px"} lineHeight={"32px"}>
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
            my={{ base: 8 }}
            textAlign={"center"}
          >
            WHY CHOOSE NEXTDECADEMINERS.COM?
          </Heading>
          <Grid
            gap={6}
            templateColumns={"repeat(auto-fit, minmax(240px, 1fr))"}
          >
            {whyChooseUs.map((_, i) => (
              <Box key={i} pl={{ base: "6rem", lg: "0" }}>
                <Heading mb={3} fontSize={"20px"} fontWeight="500">
                  {_.title}
                </Heading>
                <Text fontSize="18px">{_.content}</Text>
              </Box>
            ))}
          </Grid>
          <Box w="full" mx="auto" maxW={"480px"}>
            <Button
              boxShadow="0 4px 8px rgba(0,0,0,.1)"
              borderRadius="4px"
              h="4rem"
              w="100%"
              bg="#F3703A"
              lineHeight="4rem"
              margin="4rem auto"
              color={"white"}
              fonWeight={"bold"}
              fontSize={"20px"}
              _hover={{ color: "#F3703A", bg: "#FFF" }}
            >
              <RouterLink to="/auth/signup">Get Started Now!</RouterLink>
            </Button>
          </Box>
        </Box>
      </div>
      <Box bg={"#152136"} as="footer" py={6} color={"white"}>
        <div className="wrapper">
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
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
              <RouterLink to="/">
                <Image src={logoSrc} alt="" />
              </RouterLink>
              <Text lineHeight={3} fontSize={"12px"}>
                &copy; 2020 NEXTDECADEMINERS.COM
              </Text>
              <Text fontSize={"12px"}>v.1.2.0</Text>
            </Box>
          </Grid>
        </div>
      </Box>
    </Box>
  );
};

export default LandingPage;
