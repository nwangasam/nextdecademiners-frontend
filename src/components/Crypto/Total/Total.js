import React, { memo } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { ReactComponent as BitcoinCashIcon } from "../../../assets/images/bitcoin-cash.svg";

import { TabPanel, Flex, Box, Heading, Text, Divider, Badge } from "@chakra-ui/core";

const cryptos = [
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

const Total = React.forwardRef((props, ref) => {
  return (
    <TabPanel pr={3} ref={ref} {...props}>
      {cryptos.map((crypto) => (
        <React.Fragment key={crypto.id + Math.random()}>
          <Flex align="center" py={{ base: 2, md: 3, lg: 4 }}>
            <Box
              as={crypto.icon}
              size="32px"
              color={`${crypto.color}.400`}
            ></Box>

            <Heading
              fontSize="20px"
              fontWeight="500"
              ml={3}
              color="color: rgb(53, 63, 82)"
            >
              {crypto.text}
            </Heading>

            <Flex direction="column" align="flex-end" ml="auto">
                {props?.user?.isAdminDeposit &&
                  Number(props.user.balance[crypto.id]) > 0 && (
                    <Text fontSize="14px" color="#449e75" fontWeight="500">
                      <Badge variantColor={"green"}>
                        Admin initiated deposit
                      </Badge>
                    </Text>
                  )}

                  
              <Text fontSize="18px" fontWeight="500" color="rgb(53, 63, 82)">
                {props.user &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(props.user.balance[crypto.id]))}
              </Text>
              <Text fontSize="16px" color="rgb(152, 161, 178)" fontWeight="500">
                {`${crypto.symbol}`}
              </Text>

            </Flex>
          </Flex>
          <Divider w="100%" mx="auto" />
        </React.Fragment>
      ))}
    </TabPanel>
  );
});

export default memo(Total);
