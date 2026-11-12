import React, { memo } from "react";
import { Box, Flex, Avatar, Text, Badge, Icon } from "@chakra-ui/core";

// Account details shown at the top of the dashboard for upgraded accounts
const Row = ({ label, value }) => (
  <Flex
    justify="space-between"
    align="baseline"
    py="0.6rem"
    borderTop="1px solid"
    borderColor="gray.100"
  >
    <Text fontSize="13px" color="rgb(152, 161, 178)" fontWeight="500" mr={4}>
      {label}
    </Text>
    <Text
      fontSize="14px"
      color="rgb(53, 63, 82)"
      fontWeight="500"
      textAlign="right"
      wordBreak="break-all"
    >
      {value}
    </Text>
  </Flex>
);

const AccountCard = ({ user }) => {
  if (!user || !user.upgradedTo) return null;

  return (
    <Box
      as="section"
      aria-label="Account details"
      mt={4}
      mb={6}
      p={{ base: 4, md: 5 }}
      bg="white"
      borderRadius="12px"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 12px rgba(16, 24, 40, 0.04)"
      position="relative"
      overflow="hidden"
    >
      {/* Accent strip */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="3px"
        bgImage="linear-gradient(90deg, #449e75, #3182ce)"
      />

      <Flex align="center" mb={3} flexWrap="wrap">
        <Avatar name={user.name} size="md" bg="blue.500" color="white" />
        <Box ml={3} flex="1" minW="0">
          <Text
            fontSize="18px"
            fontWeight="600"
            color="rgb(53, 63, 82)"
            isTruncated
          >
            {user.name}
          </Text>
          <Text fontSize="13px" color="rgb(152, 161, 178)" isTruncated>
            {user.email}
          </Text>
        </Box>
        <Badge
          variantColor="green"
          fontSize="12px"
          px={2}
          py={1}
          borderRadius="full"
          d="flex"
          alignItems="center"
          mt={{ base: 3, sm: 0 }}
        >
          <Icon name="check-circle" size="12px" mr={1} />
          Account upgraded
        </Badge>
      </Flex>

      <Row label="Full name" value={user.name} />
      <Row label="Email" value={user.email} />
      <Row label="Referral" value={user.referalEmail || "None"} />
      <Row label="Account level" value={`${user.upgradedTo} (upgraded)`} />
    </Box>
  );
};

export default memo(AccountCard);
