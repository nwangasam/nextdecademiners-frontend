import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

const ChakraUIProvider = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    {children}
  </ThemeProvider>
);

ReactDOM.render(
  <Router>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*

APP COMPONENTS

  * Sidebar (desktop)
  * Navbar
  * MetaPanel
  * 


 */
