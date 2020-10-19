import React, { lazy, Suspense, useState, useEffect } from "react";
import axios from "axios";

import { Grid, useDisclosure } from "@chakra-ui/core";
import { Route, Switch } from "react-router-dom";
import { Spinner } from "@chakra-ui/core";
// import { Skeleton, Heading, Spinner } from "@chakra-ui/core";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../components/Layout/Layout";

const Toolbar = lazy(() => import("../components/Toolbar/Toolbar"));
const MainNavigation = lazy(() =>
  import("../components/Navigation/MainNavigation/MainNavigation")
);
const Crypto = lazy(() => import("../components/Crypto/Crypto"));
const Chart = lazy(() => import("../components/Chart/Chart"));
const Deposit = lazy(() => import("../components/Deposit/Deposit"));
const Withdraw = lazy(() => import("../components/Withdraw/Withdraw"));
const Invest = lazy(() => import("../components/Investment/Investment"));
const Account = lazy(() => import("../components/Account/Account"));
const Admin = lazy(() => import("../components/Admin/Admin"));

const Dashboard = (props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
    
  const [user, setUser] = useState(null);
  

  const [loadingPage, setLoadingPage] = useState(false);
  const [pageError, setPageError] = useState(false);
  
  const renderTotatBalance = (currency) => {
    if (!user) return;
    let total = 0;
    const userBal = { ...user.balance };
    for (const cur in userBal) {
      total += userBal[cur];
    }
    if (currency && typeof currency === "number") total = currency;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(total));
  };

  async function fetchUserData(route) {
    const requestOption = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${props.token}`,
        'Content-Type': 'application/json',
      },
    };
    setLoadingPage(true);
    try {
      const request = await axios(
        `https://nextdecademiners.herokuapp.com/user/${route}`,
        requestOption
      );
      
      setPageError(false)
      setLoadingPage(false);
      return request.data;
    } catch(err) {
      setPageError(true)
      setLoadingPage(false);
      return;
    }
  }

  useEffect(() => {
    (async () => {
      const { user } = await fetchUserData('profile');
      if (!user) return;
      setUser(() => user);
    })()
  }, []);
  return (
    <Layout
      header={
        <Toolbar>
          <MainNavigation
            toggleSidebar={onToggle}
            isOpen={isOpen}
            user={user}
            totalBalance={renderTotatBalance}
          />
        </Toolbar>
      }
    >
      <Grid
        gap={4}
        templateColumns={{ base: "1fr", lg: "240px repeat(2, 1fr)" }}
        bg="orange"
      >
        <Route
          path="/"
          render={(properties) => (
            <Sidebar
              {...properties}
              closeSidebar={onClose}
              isOpen={isOpen}
              user={user}
              totalBalance={renderTotatBalance}
            />
          )}
        />
        <Suspense
          fallback={
            <Grid pos="0" h="100vh" style={{ placeItems: "center" }} gap={5}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Grid>
          }
        >
          <Switch>
            <Route
              path="/"
              exact
              render={(properties) => (
                <Crypto
                  {...properties}
                  token={props.token}
                  user={user}
                  totalBal={renderTotatBalance}
                />
              )}
            />

            <Route
              path="/deposit"
              render={(properties) => (
                <Deposit {...properties} user={user} token={props.token} />
              )}
            />

            <Route path="/invest" component={Invest} />

            <Route
              path="/withdraw"
              render={(properties) => (
                <Withdraw
                  {...properties}
                  user={user}
                  token={props.token}
                  totalBalance={renderTotatBalance}
                />
              )}
            />
            <Route
              path="/admin"
              render={(properties) => (
                <Admin {...properties} user={user} token={props.token} />
              )}
            />
            <Route
              path="/account"
              render={(properties) => (
                <Account
                  {...properties}
                  user={user}
                  totalBalance={renderTotatBalance}
                  logoutHandler={props.logoutHandler}
                />
              )}
            />
          </Switch>
        </Suspense>
        <Route path="/" exact>
          <Chart />
        </Route>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
