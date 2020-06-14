import React, { useState, useRef } from "react";
import {
  Flex,
  Stack,
  Box,
  Heading,
  Text,
  Select,
  Button,
  Scale,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";

import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { ReactComponent as BitcoinCashIcon } from "../../assets/images/bitcoin-cash.svg";

const crypto = {
  bitcoin: {
    label: "Bitcoin (BTC)",
    color: "orange",
    address: "1BuFZ5pJMoZfibcTeuEMPwvp5GbG4gu6pq",
    walletAccount: "My Bitcoin Wallet",
    symb: "BTC",
    icon: FaBitcoin,
  },
  ethereum: {
    label: "Ethereum (ETH)",
    color: "gray",
    address: "0x1a6f6a40c259d4408970a1fdea40f5f1c11b72a6",
    walletAccount: "My Ethereum Wallet",
    symb: "ETH",
    icon: FaEthereum,
  },
  "bitcoin-cash": {
    label: "Bitcoin Cash (BCH)",
    color: "yellow",
    address: "qzmz4c2s0dhrdssj7lapfgnevqy3nr539qnpjf8ant",
    walletAccount: "My Bitcoin Cash Wallet",
    symb: "BCH",
    icon: BitcoinCashIcon,
  },
};

const Withdraw = (props) => {
  const [currencyId, setCurrencyId] = useState("bitcoin");
  const [amount, setAmount] = useState();
  const [address, setAddress] = useState("");

  const inputChangeHandler = (e, cb) => cb(e.target.value);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const cancelRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = () => {
    onClose();
    if (!props.user._id) return;
    setLoading(true);
    fetch("https://nextdecademiners.herokuapp.com/user/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        currency: currencyId,
        amount,
        address,
        email: props.user.email,
        user: props.user._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        props.history.replace("/");
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  };

  return (
    <Box gridColumn={{ lg: "2 / 3" }}>
      <Flex align="center" mb={8}>
        <Box
          as={crypto[currencyId].icon}
          size="40px"
          mr={4}
          color={`${crypto[currencyId].color}.400`}
        />
        <Heading size="lg" color="#353f52">
          Withdraw {crypto[currencyId].label}
        </Heading>
      </Flex>
      <Stack spacing={4} isInline align="center">
        <Stack spacing={2} flex="30%">
          <Text fontSize="18px" fontWeight="500">
            Currency
          </Text>
          <Select
            size="lg"
            icon={MdArrowDropDown}
            iconSize={8}
            value={currencyId}
            onChange={(e) => inputChangeHandler(e, setCurrencyId)}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="bitcoin-cash">Bitcoin Cash</option>
          </Select>
        </Stack>
        <Stack spacing={2} my={5} flex="1fr">
          <Text fontSize="18px" fontWeight="500">
            From
          </Text>
          <Select
            size="lg"
            icon={MdArrowDropDown}
            iconSize={8}
            value={crypto[currencyId].walletAccount}
            onChange={() => true}
          >
            <option value="MyWallet">{crypto[currencyId].walletAccount}</option>
          </Select>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Text fontSize="18px" fontWeight="500">
          Your {crypto[currencyId].label} address
        </Text>
        <Input
          placeholder={`Your ${crypto[currencyId].label} address `}
          size="lg"
          value={address}
          onChange={(e) => inputChangeHandler(e, setAddress)}
        />
      </Stack>

      <Stack spacing={2} my={5}>
        <Text fontSize="18px" fontWeight="500">
          Amount to withdraw($)
        </Text>
        <Flex align="center" w="100%">
          <Flex flex="1">
            <InputGroup size="lg" m={0} w="full">
              <Input
                type="number"
                placeholder="$0.00"
                onChange={(e) => inputChangeHandler(e, setAmount)}
              />
              <InputRightElement
                children={
                  <Text fontSize="14px" fontWeight="500" color="gray.300">
                    $
                  </Text>
                }
              />
            </InputGroup>
          </Flex>
        </Flex>
      </Stack>
      <>
        <Button
          w="full"
          size="lg"
          my={5}
          bg="red.100"
          color="red.600"
          loadingText="Sending request..."
          isLoading={loading}
          onClick={onOpen}
          isDisabled={
            +amount <= props.user.balance[currencyId] && address && amount || loading
              ? false
              : true
          }
        >
          {+amount >= props.user.balance[currencyId]
            ? `Insufficient ${currencyId} balance!`
              : `Save & Make Withdrawal Request`}
        </Button>
        <Scale in={isOpen}>
          {(styles) => (
            <AlertDialog
              leastDestructiveRef={cancelRef}
              finalFocusRef={btnRef}
              onClose={onClose}
              isOpen={true}
            >
              <AlertDialogOverlay opacity={styles.opacity} />
              <AlertDialogContent {...styles}>
                <AlertDialogHeader>Make Withdrawal!</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to Make Withdrawal?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button
                    variantColor="green"
                    ml={3}
                    isDisabled={!props.user._id}
                    onClick={handleWithdrawal}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Scale>
      </>
    </Box>
  );
};

export default Withdraw;
