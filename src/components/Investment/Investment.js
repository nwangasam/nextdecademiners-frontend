import React from "react";

import {
  Flex,
  Box,
  Heading,
  Text,
} from "@chakra-ui/core";
import { FaBitcoin } from "react-icons/fa";

import InvestmentPlan from './plan';

const Investment = (props) => {
  return (
    <Box gridColumn={{ lg: "2 / 3"}}>
      <Flex>
        <Box as={FaBitcoin} mr={4} color="orange.400" size="48px"></Box>
        <Box>
          <Heading as="h2" size="xl" color="#353f52">
            Invest Cryptocurrency
          </Heading>
          <Text
            color="rgb(103, 113, 133)"
            fontSize="20px"
            fontWeight="500"
            mt={2}
            mb={10}
          >
            Deposit crypto and watch it grow.
          </Text>
        </Box>
      </Flex>
      <InvestmentPlan isAuth />
    </Box>
  );
};

export default Investment;
