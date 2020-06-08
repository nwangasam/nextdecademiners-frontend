import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  FormHelperText,
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

const Signup = (props) => {
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
      <Heading
        mb={8}
        fontSize={{ base: '27px', lg: '30px' }}
        textAlign='center'
        fontWeight='400'
      >
        Create an Account
      </Heading>
      <form>
        <Stack spacing={4} mb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor='name'>Username</FormLabel>
            <Input name='username' placeholder='e.g. john doe' />
          </FormControl>
          <FormControl w='full' isRequired>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input name='email' placeholder='e.g. example@gmail.com' />
          </FormControl>
          <FormControl w='full' isRequired>
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
          <FormHelperText>
            By creating an account, you agree to our{' '}
            <Link
              color='blue.600'
              fontWeight='500'
              as={RouterLink}
              to='/terms-of-service'
            >
              Terms of Service
            </Link>{' '}
            &amp;{' '}
            <Link
              color='blue.600'
              fontWeight='500'
              as={RouterLink}
              to='/privacy-policy'
            >
              Privacy Policy
            </Link>
          </FormHelperText>
        </Stack>
        <Button mt={5} variantColor='blue' type='submit' w='full'>
          Continue
        </Button>
      </form>
      <Text mt={4} fontSize='1.09rem' textAlign='center'>
        Already have an account?{' '}
        <Link color='blue.500' as={RouterLink} to='/login'>
          Login
          <Icon name='external-link' mx='2px' verticalAlign='middle' />
        </Link>
      </Text>
    </Box>
  );
};

export default Signup;
