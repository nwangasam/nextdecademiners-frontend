import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/core";

import logo from "../../assets/images/logo.png";

const Logo = (props) => (
  <Link to="/">
    <Image
      h={{ base: "1.8rem", lg: "2.2rem" }}
      src={logo}
      alt="Global Finance Logo"
    />
  </Link>
);

export default Logo;
