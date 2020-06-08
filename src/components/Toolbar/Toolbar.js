import React from 'react';

import { Flex } from '@chakra-ui/core';

const toolbar = (props) => (
  <Flex direction='column' bg='blue.700' zIndex='overlay'>
    {props.children}
  </Flex>
)

export default toolbar;
