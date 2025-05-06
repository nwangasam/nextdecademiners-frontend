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
  Box,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/core";

import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import Sidebar from "../../Sidebar/Sidebar";

const MainNavigation = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, totalBalance } = props;

  return (
    <>
      <Box
        as="section"
        pos={{ base: "fixed", md: "initial" }}
        gridColumn={{ md: "1/-1" }}
        bg="#152136"
        zIndex="sticky"
        transition=".3s all ease"
        w="full"
      >
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
              <Avatar
                name={user.name}
                src={user?.avatar ?? "https://bit.ly/broken-link"}
              />
            ) : (
              <Avatar />
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
            <MobileToggle onToggle={onToggle} isOpen={isOpen} />
          </Box>
          <Divider orientation="vertical" borderColor="rgba(225, 225, .6)" />
          <Heading fontWeight="600" size="md" color="white" ml={3} mr="auto">
            {user && totalBalance()}
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
      </Box>
      <Box d={{ md: "none" }}>
        <Sidebar
          user={user}
          isOpen={isOpen}
          totalBalance={totalBalance}
          mobile
        />
      </Box>
    </>
  );
};

export default MainNavigation;
