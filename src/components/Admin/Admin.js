import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { ReactComponent as BitcoinCashIcon } from "../../assets/images/bitcoin-cash.svg";

import {
  Flex,
  Box,
  Heading,
  Text,
  Skeleton,
  Button,
  Avatar,
  Badge,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
} from "@chakra-ui/core";

const stats = [
  { id: "total", text: "All Users" },
  { id: "investments", text: "All Deposits" },
  { id: "total", text: "All Withdrawals" },
];

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

const Admin = (props) => {
  const [users, setUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const [deposits, setDeposits] = useState();
  // const [totalDeposits, setTotalDeposits] = useState();

  const [withdrawals, setWithdrawals] = useState();
  // const [totalWithdrawals, setTotalWithdrawals] = useState();

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const requestOption = {
        method: "get",
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      };
    
      const urls = [
        "https://nextdecademiners.herokuapp.com/admin/users",
        "https://nextdecademiners.herokuapp.com/admin/deposits",
        "https://nextdecademiners.herokuapp.com/admin/withdrawals",
      ];
      
      let requests = urls.map((url) => axios(url, requestOption));

      let response = await Promise.all(requests);
      const [
        { users, totalUsers },
        { deposits },
        { withdrawals },
      ] = response.map((res) => res.data);
      setUsers(users);
      setTotalUsers(totalUsers);

      setDeposits(deposits);
      // setTotalDeposits(totalDeposits);

      setWithdrawals(withdrawals);
      // setTotalWithdrawals(totalWithdrawals);
    }
    fetchData();
  }, [props.token]);

  function confirmDepositHandler(e, depositData) {
    const requestOption = {
      method: "get",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    };
    if (!depositData._id) return;
    setLoading(true);
    fetch(`https://nextdecademiners.herokuapp.com/admin/deposit`, {
      method: "POST",
      headers: requestOption.headers,
      body: JSON.stringify(depositData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function confirmWithdrawalHandler(e, withdrawal) {
    if (!withdrawal._id) return;
    setLoading(true);
    fetch(`https://nextdecademiners.herokuapp.com/admin/withdraw`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(withdrawal),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box gridColumn={{ lg: "2 / 3" }}>
      <Skeleton isLoaded={users}>
        <Heading fontWeight="normal" mb={4} borderRadius={"40px"}>
          {totalUsers} users registered
        </Heading>
      </Skeleton>
      <Tabs variant="soft-rounded" variantColor="green" mt={{ lg: 5 }}>
        <TabList mb="1em">
          {stats.map((stat, i) => {
            return (
              <Tab outline="none" key={stat.id}>
                <Skeleton isLoaded={users}>{stat.text}</Skeleton>
              </Tab>
            );
          })}
        </TabList>
        <TabPanels as="ul">
          <TabPanel>
            <Skeleton isLoaded={users}>
              {users &&
                users.map((user, i) => (
                  <Flex key={user._id} my={5}>
                    <Avatar name={user.name} />
                    <Box ml="3">
                      <Text fontWeight="bold">
                        {user.name}
                        <Badge ml="1" variantColor="green">
                          {moment(user.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                      <Text fontSize="sm" color="blue.400">
                        {user.email}
                      </Text>
                      <Text as="span" fontSize=".8rem" color="blue.400">
                        Referal:{" "}
                        {user.referalEmail ? user.referalEmail : "None"}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              <Skeleton
                isLoaded={users}
                margin="20px 0"
                borderRadius={"40px"}
                h="70px"
              />
              <Skeleton
                isLoaded={users}
                margin="20px 0"
                borderRadius={"40px"}
                h="70px"
              />
              <Skeleton
                isLoaded={users}
                margin="20px 0"
                borderRadius={"40px"}
                h="70px"
              />
            </Skeleton>
          </TabPanel>
          <TabPanel>
            {deposits &&
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
                    <Box ml="3" mr="auto" onClick={onToggle}>
                      <Text fontWeight="bold" fontSize="1.1rem">
                        {deposit.email}
                      </Text>
                      <Text color="blue.400" mb={1}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(deposit.amount))}
                      </Text>
                      <Text color="green.400" mb={1} fontSize=".85rem">
                        {deposit.plan}
                        <Badge ml="1" variantColor="green">
                          {moment(deposit.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                    </Box>

                    <Box
                      onClick={(e) => (confirmDepositHandler(e, deposit))}
                      visibility={isOpen ? "visible" : "hidden"}
                      transition={"opacity .28s ease-out"}
                      pointerEvents={
                       loading || deposit.status === "confirmed" ? "none" : "all"
                      }
                    >
                      <Button
                        d={{ base: "none", lg: "flex" }}
                        rightIcon="check-circle"
                        variantColor={
                          deposit.status === "confirmed" ? "green" : "blue"
                        }
                        ml="auto"
                        px={2}
                        isLoading={loading}
                        isDisabled={loading || deposit.status === "confirmed"}
                        cursor={
                          deposit.status === "confirmed"
                            ? "not-allowed"
                            : "pointer"
                        }
                      >
                        {deposit.status === "confirmed"
                          ? "Confirmed"
                          : "Confirm Request"}
                      </Button>
                      <IconButton
                        isDisabled={loading || deposit.status === "confirmed"}
                        d={{ base: "flex", lg: "none" }}
                        variantColor={
                          deposit.status === "confirmed" ? "green" : "blue"
                        }
                        isLoading={loading}
                        ml="auto"
                        cursor={
                          deposit.status === "confirmed"
                            ? "not-allowed"
                            : "pointer"
                        }
                        aria-label={
                          deposit.status === "confirmed"
                            ? "Confirmed"
                            : "Confirm Request"
                        }
                        icon="check-circle"
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
            {deposits && deposits.length <= 0 && (
              <Text fontSize="lg">No Deposit so far!</Text>
            )}
          </TabPanel>
          <TabPanel>
            {withdrawals &&
              withdrawals.map((withdraw, i) => (
                <Box
                  border="1px solid #EEE"
                  key={withdraw._id}
                  borderRadius="4px"
                  p={2}
                  mb={4}
                >
                  <Flex align="center">
                    <Box
                      as={cryptoLogos[withdraw.currency].icon}
                      color={`${cryptoLogos[withdraw.currency].color}.400`}
                      size="calc(2.2rem + 1vw)"
                    />
                    <Box ml="3" mr="auto" onClick={onToggle}>
                      <Text fontWeight="bold" fontSize="1.1rem">
                        {withdraw.email}
                      </Text>
                      <Text fontWeight="semibold" fontSize="1.1rem">
                        {withdraw.address}
                      </Text>
                      <Text color="red.400" mb={1}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(withdraw.amount))}
                      </Text>
                      <Text color="red.400" mb={1} fontSize=".85rem">
                        <Badge ml="1" variantColor="green">
                          {moment(withdraw.createdAt).fromNow().toString()}
                        </Badge>
                      </Text>
                    </Box>

                    <Box
                      onClick={(e) => (confirmWithdrawalHandler(e, withdraw)
                      )}
                      visibility={isOpen ? "visible" : "hidden"}
                      transition={"opacity .28s ease-out"}
                      pointerEvents={
                        loading || withdraw.status === "confirmed" ? "none" : "all"
                      }
                    >
                      <Button
                        d={{ base: "none", lg: "flex" }}
                        rightIcon="check-circle"
                        variantColor={
                          withdraw.status === "confirmed" ? "green" : "blue"
                        }
                        isLoading={loading}
                        ml="auto"
                        px={2}
                        isDisabled={loading || withdraw.status === "confirmed"}
                        cursor={
                          withdraw.status === "confirmed"
                            ? "not-allowed"
                            : "pointer"
                        }
                      >
                        {withdraw.status === "confirmed"
                          ? "Confirmed"
                          : "Confirm Request"}
                      </Button>
                      <IconButton
                        isLoading={loading}
                        isDisabled={loading || withdraw.status === "confirmed"}
                        d={{ base: "flex", lg: "none" }}
                        variantColor={
                          withdraw.status === "confirmed" ? "green" : "blue"
                        }
                        ml="auto"
                        cursor={
                          withdraw.status === "confirmed"
                            ? "not-allowed"
                            : "pointer"
                        }
                        aria-label={
                          withdraw.status === "confirmed"
                            ? "Confirmed"
                            : "Confirm Request"
                        }
                        icon="check-circle"
                      />
                    </Box>
                  </Flex>
                </Box>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
