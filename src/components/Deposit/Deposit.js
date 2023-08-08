import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Stack,
  Select,
  Image,
  Input,
  Button,
  useClipboard,
  Scale,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/core";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { ReactComponent as BitcoinCashIcon } from "../../assets/images/bitcoin-cash.svg";

import { MdArrowDropDown } from "react-icons/md";

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
    label: "Bitcoin (BCH)",
    color: "yellow",
    address: "qzmz4c2s0dhrdssj7lapfgnevqy3nr539qnpjf8ant",
    walletAccount: "My Bitcoin Cash Wallet",
    symb: "BCH",
    icon: BitcoinCashIcon,
  },
  plans: [
    "1.4% Profit in 24 hrs",
    "4% Profit in 65 min",
    "10% Profit in 24 hrs",
    "15% Profit in 7 days",
  ],
};

const Deposit = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const cancelRef = React.useRef();

  const [currencyId, setCurrencyId] = useState("bitcoin");

  const { onCopy, hasCopied } = useClipboard(crypto[currencyId].address);
  const [plan, setPlans] = useState("1.4% Profit in 24 hrs");
  const [amount, setAmount] = useState();

  const inputChangeHandler = (e, cb) => cb(e.target.value);
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    onClose();
    if (!props.user._id) return;
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/user/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        currency: currencyId,
        amount,
        plan,
        user: props.user,
        email: props.user.email,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        props.history.replace("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
          Deposit {crypto[currencyId].label}
        </Heading>
      </Flex>
      <Stack spacing={2}>
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
      <Stack spacing={2} my={5}>
        <Text fontSize="18px" fontWeight="500">
          Choose an Investment Plan
        </Text>
        <Select
          size="lg"
          icon={MdArrowDropDown}
          iconSize={8}
          value={plan}
          onChange={(e) => inputChangeHandler(e, setPlans)}
        >
          {crypto.plans.map((_, i) => (
            <option value={_} key={i + Math.random()}>
              {_}
            </option>
          ))}
        </Select>
      </Stack>
      <Stack spacing={2} my={5}>
        <Text fontSize="18px" fontWeight="500">
          Receive to
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

      <Stack spacing={2} my={5}>
        <Text fontSize="18px" fontWeight="500">
          Amount to deposit($)
        </Text>
        <Flex align="center" w="100%">
          <Flex flex="1">
            <InputGroup size="lg" w="full">
              <Input
                type="number"
                placeholder="$0.00"
                onChange={(e) => inputChangeHandler(e, setAmount)}
              />
              <InputRightElement
                children={
                  <Text fontSize="14px" fontWeight="500" color="gray.300">
                    USD
                  </Text>
                }
              />
            </InputGroup>
          </Flex>
        </Flex>
      </Stack>

      <Box w="100%" my={4}>
        <Image
          mx="auto"
          src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${crypto[currencyId].address}`}
          alt={`${currencyId} crypto address`}
        />
      </Box>

      <Stack spacing={2}>
        <Text fontSize="18px" fontWeight="500">
          Send crypto to this address
        </Text>
        <Flex mb={2}>
          <Input
            value={crypto[currencyId].address}
            isReadOnly
            placeholder="Send crypto to this address"
          />
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Flex>
      </Stack>
      <>
        <Button
          w="full"
          size="lg"
          my={5}
          bg="green.100"
          color="green.600"
          ref={btnRef}
          isDisabled={loading}
          isLoading={loading}
          loadingText="Sending request..."
          onClick={onOpen}
        >
          SAVE &amp; Make Deposit Request
        </Button>
        <Scale in={isOpen}>
          {(styles) => (
            <AlertDialog
            isCentered
              leastDestructiveRef={cancelRef}
              finalFocusRef={btnRef}
              onClose={onClose}
              isOpen={true}
            >
              <AlertDialogOverlay opacity={styles.opacity} />
              <AlertDialogContent {...styles}>
                <AlertDialogHeader>Make Deposit</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to send Deposit request?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button variantColor="green" ml={3} isDisabled={!props.user._id} onClick={handleDeposit}>
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

export default Deposit;
