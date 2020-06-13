import React from "react";
import moment from "moment";
import {
  Flex,
  Box,
  Heading,
  Text,
  Divider,
  Tabs,
  TabList,
  Badge,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/core";

import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { ReactComponent as BitcoinCashIcon } from "../../assets/images/bitcoin-cash.svg";

const cryptoLogos = {
  bitcoin: {
    icon: FaBitcoin,
    color: "orange",
  },
  ethereum: {
    icon: FaEthereum,
    color: "gray",
  },
  "bitcoin-cash": {
    icon: BitcoinCashIcon,
    color: "yellow",
  },
};

const crypto = [
  {
    icon: FaBitcoin,
    text: "Bitcoin",
    color: "orange",
    id: "bitcoin",
    symbol: "BTC",
  },
  {
    icon: FaEthereum,
    text: "Ether",
    color: "gray",
    id: "ethereum",
    symbol: "ETH",
  },
  {
    icon: BitcoinCashIcon,
    text: "Bitcoin Cash",
    color: "yellow",
    id: "bitcoin-cash",
    symbol: "BCH",
  },
];
const Crypto = ({ user, deposits, withdrawals, totalBalance: totalBal }) => {

  const stats = [
    { id: "total", text: "Total" },
    { id: "investments", text: "Investments" },
    { id: "total", text: "Withdrawals" },
  ];

  return (
    <Box gridColumn={{ lg: "2 / 3" }}>
      <Flex
        align="center"
        justify="space-between"
        d={{ base: "none", lg: "flex" }}
      >
        <Heading
          fontSize="16px"
          fontWeight="500"
          color="rgb(152, 161, 178)"
          as="h3"
        >
          Total Balance
        </Heading>
        <Text fontSize="32px" fontWeight="500" color="rgb(53, 63, 82)">
          {user && totalBal()}
        </Text>
      </Flex>
      <Tabs variant="soft-rounded" variantColor="green" mt={{ lg: 5 }}>
        <TabList mb="1em">
          {stats.map((stat, i) => {
            return (
              <Tab key={i} outline="none">
                {stat.text}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as="ul">
          <TabPanel>
            {crypto.map((c) => (
              <React.Fragment key={c.id}>
                <Flex align="center" py={{ base: 2, md: 3, lg: 4 }}>
                  <Box as={c.icon} size="32px" color={`${c.color}.400`}></Box>
                  <Heading
                    fontSize="20px"
                    fontWeight="500"
                    ml={3}
                    color="color: rgb(53, 63, 82)"
                  >
                    {c.text}
                  </Heading>
                  <Flex direction="column" align="flex-end" ml="auto">
                    <Text
                      fontSize="18px"
                      fontWeight="500"
                      color="rgb(53, 63, 82)"
                    >
                      {user &&
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(user.balance[c.id]))}
                    </Text>
                    <Text
                      fontSize="16px"
                      color="rgb(152, 161, 178)"
                      fontWeight="500"
                    >
                      {`${c.symbol}`}
                    </Text>
                  </Flex>
                </Flex>
                <Divider w="100%" mx="auto" />
              </React.Fragment>
            ))}
          </TabPanel>
          <TabPanel>
            {deposits && deposits.length > 0 &&
              deposits.map((deposit, i) => (
                <Box
                  border="1px solid #EEE"
                  key={deposit._id}
                  borderRadius="4px"
                  p={2}
                  mb={4}
                >
                  <Flex align="center">
                    <Box
                      as={cryptoLogos[deposit.currency].icon}
                      color={`${cryptoLogos[deposit.currency].color}.400`}
                      size="calc(2.2rem + 1vw)"
                    />
                    <Box ml="3" mr="auto">
                      <Text color="blue.400" mb={1} fontWeight='semibold'>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(deposit.amount))}
                      </Text>
                      <Text color="green.400" mb={1} fontSize=".85rem">
                        {deposit.plan}
                        <Text ml="3" as='span'  color="gray.400">
                          {moment(deposit.createdAt).fromNow().toString()}
                        </Text>
                      </Text>
                      <Badge
                        ml="auto"
                        variantColor={
                          deposit.status === "unconfirmed"
                            ? "red"
                            : "green"
                        }
                      >
                        {deposit.status === "unconfirmed"
                          ? "Unconfirmed"
                          : "Confirmed"}
                      </Badge>
                    </Box>
                  </Flex>
                </Box>
              ))}
            {deposits && deposits.length <= 0 && (
              <Text fontSize="lg">You've not made any deposit!</Text>
            )}
          </TabPanel>
          <TabPanel>
          {withdrawals && withdrawals.length > 0 &&
              withdrawals.map((withdrawal, i) => (
                <Box
                  border="1px solid #EEE"
                  key={withdrawal._id}
                  borderRadius="4px"
                  p={2}
                  mb={4}
                >
                  <Flex align="center">
                    <Box
                      as={cryptoLogos[withdrawal.currency].icon}
                      color={`${cryptoLogos[withdrawal.currency].color}.400`}
                      size="calc(2.2rem + 1vw)"
                    />
                    <Box ml="3" mr="auto">
                      <Text color="red.400" mb={1} fontWeight='semibold'>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(withdrawal.amount))}
                      </Text>
                      <Text color="green.400" mb={1} fontSize=".85rem">
                        {withdrawal.address}
                        <Text ml="3" as='span'  color="gray.400">
                          {moment(withdrawal.updatedAt).fromNow().toString()}
                        </Text>
                      </Text>
                      <Badge
                        ml="auto"
                        variantColor={
                          withdrawal.status === "unconfirmed"
                            ? "red"
                            : "green"
                        }
                      >
                        {withdrawal.status === "unconfirmed"
                          ? "Unconfirmed"
                          : "Confirmed"}
                      </Badge>
                    </Box>
                  </Flex>
                </Box>
              ))}
            {withdrawals && withdrawals.length <= 0 && (
              <Text fontSize="lg">You've not made any withdrawal!</Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Crypto;
