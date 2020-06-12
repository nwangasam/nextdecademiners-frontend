import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Grid,
  Flex,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/core";

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

const Plan = (props) => (
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
        bg={"white"}
        boxShadow="inset 0 4px 12px rgba(0,0,0,.15)"
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
        <Text mb={8} fontSize={"3xl"} fontWeight={"bold"} color={"#152136"}>
          {p.interest}%
          <span
            style={{
              fontSize: "18px",
              fontWeight: "500",
              marginLeft: "4px",
              color: "gray",
            }}
          >
            /{p.duration}
          </span>
        </Text>
        <List spacing={3} as="ul" mb={4} lineHeight={1}>
          {p.features.map((l) => (
            <ListItem key={Math.random() * 4}>
              <ListIcon icon="check" color="#152136" />
              {l}
            </ListItem>
          ))}
          <ListItem fontWeight={"bold"}>
            <ListIcon icon="check" color="#152136" />${p.priceRange[0]} - $
            {p.priceRange[1]}
          </ListItem>
        </List>
        <RouterLink to={props.isAuth ? "/deposit" : "/auth/signup"}>
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
            {props.isAuth ? "CHOOSE PLAN" : "SIGN UP"}
          </Button>
        </RouterLink>
      </Flex>
    ))}
  </Grid>
);

export default Plan;
