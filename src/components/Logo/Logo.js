import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@chakra-ui/core';

import logo from '../../assets/images/logo3.png';

const Logo = (props) => (
  <Link to='/'>
    <Image h='1.8rem' src={logo} alt='Global Finance Logo' />
  </Link>
);

export default Logo;
