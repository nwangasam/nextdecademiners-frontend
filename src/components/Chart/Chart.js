import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { ReactComponent as BitCoinCashIcon } from "../../assets/images/bitcoin-cash.svg";

import {
  Box,
  Icon,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  Button,
  MenuButton,
} from "@chakra-ui/core";

const Chart = () => {
  const [currencyId, setCurrencyId] = React.useState("bitcoin");

  const crypto = {
    bitcoin: {
      icon: FaBitcoin,
      symbol: "BTC",
      apiId: "859",
      color: "orange",
      label: "Bitcoin",
    },
    ethereum: {
      icon: FaEthereum,
      symbol: "ETH",
      apiId: "145",
      label: "Ethereum",
      color: "gray",
    },
    "bitcoin-cash": {
      icon: BitCoinCashIcon,
      symbol: "BCH",
      apiId: "157",
      label: "Bitcoin Cash",
      color: "yellow",
    },
  };

  return (
    <Box mt={{ base: 8, lg: 0 }} mx={{ base: 0, lg: 4}}>
      <Menu my={4}>
        <MenuButton as={Button} style={{ backgroundColor: 'transparent', border: '1px solid #EEE' }}>
          <Heading
            as="h1"
            fontSize="18px"
            fontWeight="600"
            d="flex"
            color="#000"
            alignItems="center"
          >
            <Box
              as={crypto[currencyId].icon}
              mr={2}
              size="30px"
              color={`${crypto[currencyId].color}.400`}
              d="inline"
            >
              </Box>{" "}
              {crypto[currencyId].label + " " + crypto[currencyId].symbol}
            <Icon
              name="chevron-down"
              size="30px"
              pos="relative"
              top="2.4px"
              ml={4}
            />
          </Heading>
        </MenuButton>
        <MenuList>
          <MenuItem minH="48px" onClick={() => setCurrencyId("bitcoin")}>
            <Box size="1.4rem" rounded="full" as={FaBitcoin} mr="12px" />
            <span>Bitcoin (BTC)</span>
          </MenuItem>
          <MenuItem minH="48px" onClick={() => setCurrencyId("ethereum")}>
            <Box size="1.4rem" rounded="full" as={FaEthereum} mr="12px" />
            <span>Ethereum (ETH)</span>
          </MenuItem>
          <MenuItem minH="48px" onClick={() => setCurrencyId("bitcoin-cash")}>
            <Box size="1.4rem" rounded="full" as={FaBitcoin} mr="12px" />
            <span>Bitcoin Cash (BCH)</span>
          </MenuItem>
        </MenuList>
      </Menu>
      <Box w="full" my={6}>
        <Box h="540px" p="0px" m="0px" w="full">
          <Box
            as="iframe"
            title={"Crypto Live Data"}
            src={`https://widget.coinlib.io/widget?type=chart&theme=dark&coin_id=${crypto[currencyId].apiId}&pref_coin_id=1505`}
            width="100%"
            height="536px"
            scrolling="auto"
            marginWidth="0"
            marginHeight="0"
            frameBorder="0"
            overflow="hidden"
            borderradius="16px"
            border="0"
            style={{ border: 0, margin: 0, padding: 0, lineHeight: "14px" }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Chart);
