import React from "react";
import { IconButton } from "@chakra-ui/core";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const MobileToggle = (props) => {
  return (
    <IconButton
      style={{ background: "transparent" }}
      display={{ lg: "none" }}
      onClick={props.toggleSidebar}
      color="white"
      aria-label="Toggle mobile navigation"
      fontSize="24px"
      icon={!props.isOpen ? GiHamburgerMenu : MdClose}
    />
  );
};
export default MobileToggle;
