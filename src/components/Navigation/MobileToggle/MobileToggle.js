import React from 'react';
import { useDisclosure, IconButton } from '@chakra-ui/core';

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

const MobileToggle = (props) => {
  return (
    <IconButton
      display={{ lg: 'none' }}
      onClick={props.toggleSidebar}
      color='white'
      variantColor='none'
      aria-label='Toggle mobile navigation'
      fontSize='24px'
      icon={!props.isOpen ? GiHamburgerMenu : MdClose}
    />
  );
};
export default MobileToggle;
