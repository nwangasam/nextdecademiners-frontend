import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  InputGroup,
  InputRightElement,
  Stack,
  FormHelperText,
  Button,
  Image,
  Text,
  Icon,
  Link,
  Box,
  Heading,
} from "@chakra-ui/core";

import Logo from "../../assets/images/logo.png";
import { required, length, email } from "../../util/validators";

class Signup extends Component {
  state = {
    signupForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      name: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      confirmPassword: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
          touched: true,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid,
      };
    });
  };

  render() {
    const { signupForm, formIsValid } = this.state;
    console.log(this.props);

    return (
      <Box
        maxW="460px"
        bg="white"
        borderRadius="8px"
        margin="3rem auto"
        p={5}
        pt="0"
      >
        <Box
        textAlign="center"
        w="80%"
        mx="auto"
        margin='auto auto 2.4rem'
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
          Create an Account
        </Heading>
        {this.props.error && (
          <Alert status="error" my={4}>
            <AlertIcon />
            <AlertTitle mr={2}>
              {this.props.error.message || this.props.error.msg}
            </AlertTitle>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={this.props.handleError}
            />
          </Alert>
        )}
        <form onSubmit={(e) => this.props.onSignup(e, signupForm)}>
          <Stack spacing={4} mb={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Username</FormLabel>
              <InputGroup>
                <Input
                  boxShadow={"inset 0 1px 2px rgba(27,31,35,.075)"}
                  name="name"
                  placeholder="e.g. john doe"
                  type="text"
                  onChange={this.inputChangeHandler}
                  value={signupForm["name"].value}
                  valid={signupForm["name"].valid}
                />
                {signupForm["name"].touched && (
                  <InputRightElement
                    style={{ transition: "all .3s ease" }}
                    children={
                      <Icon
                        name={signupForm["name"].valid ? "check" : "warning"}
                        color={
                          signupForm["name"].valid ? "green.500" : "red.500"
                        }
                      />
                    }
                  />
                )}
              </InputGroup>
            </FormControl>
            <FormControl w="full" isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <Input
                  name="email"
                  placeholder="e.g. example@gmail.com"
                  onChange={this.inputChangeHandler}
                  valid={signupForm["email"].valid}
                  value={signupForm["email"].value}
                  boxShadow={"inset 0 1px 2px rgba(27,31,35,.075)"}
                  errorBorderColor="red.300"
                  isInvalid={ this.props.error && this.props.error.msg && this.props.error.msg
                    .toLowerCase()
                    .includes("mail")}
                />
                {signupForm["email"].touched && (
                  <InputRightElement
                    style={{ transition: "all .3s ease" }}
                    children={
                      <Icon
                        name={signupForm["email"].valid ? "check" : "warning"}
                        color={
                          signupForm["email"].valid ? "green.500" : "red.500"
                        }
                      />
                    }
                  />
                )}
              </InputGroup>
            </FormControl>
            <FormControl w="full" isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={this.inputChangeHandler}
                  valid={signupForm["password"].valid}
                  value={signupForm["password"].value}
                  bg="red"
                  boxShadow={"inset 0 1px 2px rgba(27,31,35,.075)"}
                  errorBorderColor="red.300"
                  isInvalid={
                    this.props.error && this.props.error.msg &&
                    this.props.error.msg.toLowerCase().includes("password")
                  }
                />
                {signupForm["password"].touched && (
                  <InputRightElement
                    style={{ transition: "all .3s ease" }}
                    children={
                      <Icon
                        name={
                          signupForm["password"].valid ? "check" : "warning"
                        }
                        color={
                          signupForm["password"].valid ? "green.500" : "red.500"
                        }
                      />
                    }
                  />
                )}
              </InputGroup>
            </FormControl>
            <FormControl w="full" isRequired>
              <FormLabel htmlFor="confirmPassword">
                Enter password again
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter same password again"
                  onChange={this.inputChangeHandler}
                  valid={signupForm["confirmPassword"].valid}
                  value={signupForm["confirmPassword"].value}
                  bg="red"
                  boxShadow={"inset 0 1px 2px rgba(27,31,35,.075)"}
                  errorBorderColor="red.300"
                  isInvalid={this.props.error && this.props.error.msg && this.props.error.msg.toLowerCase()
                    .includes("password")}
                />
                {signupForm["confirmPassword"].touched && (
                  <InputRightElement
                    style={{ transition: "all .3s ease" }}
                    children={
                      <Icon
                        name={
                          signupForm["confirmPassword"].valid
                            ? "check"
                            : "warning"
                        }
                        color={
                          signupForm["confirmPassword"].valid
                            ? "green.500"
                            : "red.500"
                        }
                      />
                    }
                  />
                )}
              </InputGroup>
            </FormControl>
            <FormHelperText>
              By creating an account, you agree to our{" "}
              <Link
                color="blue.600"
                fontWeight="500"
                as={RouterLink}
                to="/terms-of-service"
              >
                Terms of Service
              </Link>{" "}
              &amp;{" "}
              <Link
                color="blue.600"
                fontWeight="500"
                as={RouterLink}
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </FormHelperText>
          </Stack>
          <Button
            mt={5}
            variantColor="blue"
            type="submit"
            w="full"
            isDisabled={!formIsValid || this.props.loading}
            isLoading={this.props.loading}
            loadingText="Submitting"
          >
            Continue
          </Button>
        </form>
        <Text mt={4} fontSize="1.09rem" textAlign="center">
          Already have an account?{" "}
          <Link color="blue.500" as={RouterLink} to="/auth/login">
            Login
            <Icon name="external-link" mx="2px" verticalAlign="middle" />
          </Link>
        </Text>
      </Box>
    );
  }
}

export default Signup;
