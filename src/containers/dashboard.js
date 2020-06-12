import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Grid, useDisclosure } from "@chakra-ui/core";
import { Route, Switch } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Toolbar from "../components/Toolbar/Toolbar";
import MainNavigation from "../components/Navigation/MainNavigation/MainNavigation";
import Sidebar from "../components/Sidebar/Sidebar";
import Crypto from "../components/Crypto/Crypto";
import Chart from "../components/Chart/Chart";
import Deposit from "../components/Deposit/Deposit";
import Withdraw from "../components/Withdraw/Withdraw";
import Invest from "../components/Investment/Investment";
import Account from "../components/Account/Account";
import Admin from "../components/Admin/Admin";

const Dashboard = (props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [user, setUser] = useState(null);
  const [userDeposits, setUserDeposits] = useState(null);
  const [userWithdrawals, setUserWithdrawals] = useState(null);

  const renderTotatBalance = (currency) => {
    if (!user) return;
    let total = 0;
    const userBal = { ...user.balance };
    for (const cur in userBal) {
      total += userBal[cur];
    }
    if (currency && typeof(currency) === 'number') total = currency;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(total));
  };

  const urls = [
    'http://localhost:8080/user/profile',
    'http://localhost:8080/user/deposits',
    'http://localhost:8080/user/withdrawals',
  ]

  const requestOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  }
  
  useEffect(() => {
    const fetchUserData = async (requestOption, urls) => {
      const requests = urls.map((url) => axios(url, requestOption))
      try {
        const response = await Promise.all(requests);
        const [user, deposits, withdrawals] = response;
         setUser(user.data.user);
         setUserDeposits(deposits.data.deposits);
         setUserWithdrawals(withdrawals.data.withdrawals);
         console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData(requestOption, urls);
  }, [requestOption, urls]);

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
          render={(props) => (
            <Sidebar
              {...props}
              closeSidebar={onClose}
              isOpen={isOpen}
              user={user}
              totalBalance={renderTotatBalance}
            />
          )}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={(properties) => (
              <Crypto
                {...properties}
                user={user}
                totalBalance={renderTotatBalance}
                deposits={user && userDeposits}
                withdrawals={user && userWithdrawals}
                />
            )}
          />
          <Route
            path="/deposit"
            exact
            render={(properties) => (
              <Deposit {...properties} user={user} token={props.token} />
            )}
          />
          <Route path="/invest" exact component={Invest} />
          <Route
            path="/withdraw"
            exact
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
            exact
            render={(properties) => (
              <Admin {...properties} user={user} token={props.token} />
            )}
          />
          <Route
            path="/account"
            exact
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
        <Chart />
      </Grid>
    </Layout>
  );
};

export default Dashboard;
