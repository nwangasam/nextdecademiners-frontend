import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Button,
  Image,
  Text,
  Icon,
  Link,
  Box,
  Heading,
} from "@chakra-ui/core";

import Logo from "../../assets/images/logo.png";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const focusInput = useRef();

  const handleInputChange = (e, cb) => {
    cb(e.target.value);
    setIsFormValid(email && password);
  };

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  return (
    <Box
      maxW="460px"
      borderRadius="8px"
      margin="3rem auto"
      minH="100vh"
      p={5}
      pt="0"
    >
      <Box
        textAlign="center"
        w="80%"
        mx="auto"
        margin="auto auto 2.4rem"
        p={"8px"}
      >
        <RouterLink to="/">
          <Image src={Logo} alt="Nextdecademiners logo" mx="auto" width="85%" />
        </RouterLink>
      </Box>
      <Heading
        mb={8}
        fontSize={{ base: "27px", lg: "30px" }}
        textAlign="center"
        fontWeight="400"
      >
        Welcome back! Login.
      </Heading>
      {props.error && (
        <Alert status="error" my={4}>
          <AlertIcon />
          <AlertTitle mr={2}>
            {props.error.message || props.error.msg || props.error}
          </AlertTitle>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={props.handleError}
          />
        </Alert>
      )}
      <form onSubmit={(e) => props.onLogin(e, { email, password })}>
        <Stack spacing={4} mb={4}>
          <FormControl w="full">
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <InputLeftAddon
                children={<Icon name="email" color="gray.300" />}
              />
              <Input
                ref={focusInput}
                name="email"
                placeholder="e.g. example@gmail.com"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </InputGroup>
          </FormControl>
          <FormControl w="full">
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
            <InputLeftAddon
                  children={<Icon name="lock" color="gray.300" />}
                />
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <Button
          mt={5}
          isLoading={props.loading}
          variantColor="teal"
          type="submit"
          w="full"
          isDisabled={!isFormValid || props.loading}
          loadingText="Submitting"
        >
          Login
        </Button>
      </form>
      <Text mt={4} fontSize="1.09rem" textAlign="center">
        Are you new here?{" "}
        <Link color="blue.500" as={RouterLink} to="/auth/signup">
          Create an account
          <Icon name="external-link" mx="2px" verticalAlign="middle" />
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
