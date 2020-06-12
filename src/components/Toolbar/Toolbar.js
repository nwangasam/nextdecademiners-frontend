import React from 'react';

import { Flex } from '@chakra-ui/core';

const toolbar = (props) => (
  <Flex direction='column' bg='#152136' zIndex='sticky' transition='.3s all ease'>
    {props.children}
  </Flex>
)

export default toolbar;
