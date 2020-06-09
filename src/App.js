import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Heading, Text, Flex, Grid, useDisclosure } from "@chakra-ui/core";

import "./App.css";

import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import Sidebar from "./components/Sidebar/Sidebar";
import Crypto from "./components/Crypto/Crypto";
import Chart from "./components/Chart/Chart";
import Deposit from "./components/Deposit/Deposit";
import Withdraw from "./components/Withdraw/Withdraw";
import Invest from "./components/Investment/Investment";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import LandingPage from "./pages/user/landing";

// const App = (props) => {
//   const { isOpen, onClose, onToggle } = useDisclosure();

//   return (
//     <Layout
//       // header={
//       //   <Toolbar>
//       //     <MainNavigation toggleSidebar={onToggle} isOpen={isOpen} />
//       //   </Toolbar>
//       // }
//     >
//       <Grid
//         gap={4}
//         templateColumns={{ base: '1fr', lg: '240px repeat(2, 1fr)' }}
//       >
//         {/* <Route
//           path='/'
//           render={(props) => (
//             <Sidebar {...props} closeSidebar={onClose} isOpen={isOpen} />
//           )}
//         /> */}
//         <Switch>
//           <Route path='/home' exact component={LandingPage} />
//           <Route path='/' exact component={Crypto} />
//           <Route path='/deposit' exact component={Deposit} />
//           <Route path='/withdraw' exact component={Withdraw} />
//           <Route path='/invest' exact component={Invest} />
//           <Route path='/signup' exact component={Signup} />
//           <Route path='/login' exact component={Login} />
//         </Switch>
//         {/* <Chart /> */}
//       </Grid>
//     </Layout>
//   );
// };

class App extends React.Component {
  state = {
    isAuth: false,
    authLoading: false,
    userId: null,
    token: null,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      return this.logoutHandler();
    }

    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutologout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  setAutologout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  loginHandler = async (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
        }),
      });
      if (response.status === 422) {
        throw new Error("Validation failed");
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Could not authenticated you!");
      }
      const { token, userId } = await response.json();
      this.setState({
        token,
        userId,
        isAuth: true,
        authLoading: false,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      const remainingMilliseconds = 60 * 60 * 1000 * 24;
      const expiryDate = new Date(new Date.getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      this.setAutologout(remainingMilliseconds);
    } catch (err) {
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    }
  };

  signupHandler = async (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Typ": "application/json",
        },
        body: JSON.stringify({
          name: authData.name.value,
          email: authData.email.value,
          password: authData.password.value,
        }),
      });
      if (res.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used already."
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Creating a user failed");
      }
      const result = await res.json();
      this.setState({ isAuth: false, authLoading: false });
      this.props.history.replace("/");
    } catch (err) {
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    }
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={(props) => <LandingPage {...props} />} />
        <Route
          path="/auth/signup"
          render={(props) => (
            <Signup
              {...props}
              onSignup={this.signupHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Route
          path="/auth/login"
          render={(props) => (
            <Login
              {...props}
              onLogin={this.loginHandler}
              loading={this.state.authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => {
              console.log(`You're now authenticated!`);
            }}
          />
        </Switch>
      );
    }

    return <div>{routes}</div>;
  }
}

export default App;
