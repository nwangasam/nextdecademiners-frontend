import React from "react";
import {
  Box,
  Button,
  Heading,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from "@chakra-ui/core";

const Account = ({ user, logoutHandler }) => {
  return (
    <Box gridColumn={{ lg: "2 / 3" }}>
      <Button
        size="sm"
        onClick={logoutHandler}
        variant="outline"
        variantColor="red.400"
        color="red.400"
      >
        Sign Out
      </Button>
      <Heading my={5}>User profile</Heading>
      <Box fontSize="lg" shadow="md" p={3}>
        <Heading fontSize="sm">Username</Heading>
        <Editable defaultValue={user && user.name}>
          <EditableInput />
          <EditablePreview />
        </Editable>
      </Box>
      <Box fontSize="lg" shadow="md" p={3}>
        <Heading fontSize="sm">Email Address</Heading>
        <Text>{user && user.email}</Text>
      </Box>
      {user.phone && (
        <Box fontSize="lg" shadow="md" p={3}>
          <Heading fontSize="sm">Phone number</Heading>
          <Text>{user.phone}</Text>
        </Box>
      )}
      {user.address && (
        <Box fontSize="lg" shadow="md" p={3}>
          <Heading fontSize="sm">Address</Heading>
          <Text>{user.email}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Account;
