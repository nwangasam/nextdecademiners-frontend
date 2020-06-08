import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Grid,
  Image,
  Flex,
  Text,
  Icon,
  Link,
  Box,
  Heading,
} from '@chakra-ui/core';

import Logo from '../../assets/images/logo.png';

const Login = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box
      maxW='460px'
      bg='white'
      borderRadius='8px'
      margin='auto auto'
      border='1px solid #EEE'
      p={5}
      pt='0'
    >
      <Box
        textAlign='center'
        pos='relative'
        w='80%'
        mx='auto'
        bottom='2rem'
        p={'8px'}
        bg='white'
      >
        <Image src={Logo} alt='Global finance logo' mx='auto' width='75%' />
      </Box>
      <Heading mb={8} fontSize={{ base: '27px', lg: '30px' }} textAlign='center' fontWeight='400'>
        Welcome back! Login.
      </Heading>
      <form>
        <Stack spacing={4} mb={4}>
          <FormControl w='full'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input name='email' placeholder='e.g. example@gmail.com' />
          </FormControl>
          <FormControl w='full'>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Stack>
        <Button mt={5} variantColor='teal' type='submit' w='full'>
          Login
        </Button>
      </form>
      <Text mt={4} fontSize='1.09rem' textAlign='center'>
        Are you new here?{' '}
        <Link color='blue.500' as={RouterLink} to='/signup'>
          Create an account
          <Icon name='external-link' mx='2px' verticalAlign='middle' />
        </Link>
      </Text>
    </Box>
  );
};

export default Login;
