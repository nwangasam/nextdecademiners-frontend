import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Divider,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Box,
  Button,
  Avatar,
} from "@chakra-ui/core";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";

const MainNavigation = (props) => {
const { user, totalBalance } = props;
  return (
    <>
      <Flex
        as="nav"
        w="full"
        align="center"
        p={{ base: "8px 16px", md: "8px 18px" }}
        justify="space-between"
      >
        <Logo />
        <Link to="/account">
          {user && user._id ? (
            <Avatar name={user.name} src="https://bit.ly/broken-link" />
          ) : (
            <Icon name="spinner" color="white" />
          )}
        </Link>
      </Flex>
      <Divider
        style={{ margin: "0 auto", width: "90%", padding: 0, opacity: ".1" }}
      />
      <Flex
        w="full"
        align="center"
        p={{ base: "8px 0", md: "8px 0" }}
        d={{ lg: "none" }}
      >
        <Box d="inline-block">
          <MobileToggle {...props} />
        </Box>
        <Divider orientation="vertical" borderColor="rgba(225, 225, .6)" />
        <Heading fontWeight="600" size="md" color="white" ml={3} mr="auto">
          {user && totalBalance() }
        </Heading>
        <Menu ml="auto">
          <MenuButton
            as={Button}
            rightIcon="chevron-down"
            bg="none"
            color="white"
            _expanded={{ bg: "green.100", color: "green.500" }}
            _focus={{ outline: 0, boxShadow: "outline" }}
          >
            <Heading fontWeight="600" size="md">
              Transact
            </Heading>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/deposit">Deposit</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/invest">Our plans</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/withdraw">Withdraw</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/account">My Account</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default MainNavigation;
