import React, { lazy, Suspense, useState, useEffect } from "react";
import axios from "axios";

import { Grid, useDisclosure } from "@chakra-ui/core";
import { Route, Switch } from "react-router-dom";
import { Skeleton, Heading } from "@chakra-ui/core";
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
  const [userDeposits, setUserDeposits] = useState(null);
  const [userWithdrawals, setUserWithdrawals] = useState(null);

  const url = props.match.url;

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

  const urls = [
    "https://nextdecademiners.herokuapp.com/user/profile",
    "https://nextdecademiners.herokuapp.com/user/deposits",
    "https://nextdecademiners.herokuapp.com/user/withdrawals",
  ];

  const requestOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  useEffect(() => {
    const fetchUserData = async (requestOption, urls) => {
      const requests = urls.map((url) => axios(url, requestOption));
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
  }, []);

  return (
    <Layout
      header={
        <Suspense fallback={<Skeleton height="55px" />}>
          <Toolbar>
            <MainNavigation
              toggleSidebar={onToggle}
              isOpen={isOpen}
              user={user}
              totalBalance={renderTotatBalance}
            />
          </Toolbar>
        </Suspense>
      }
      sidebar={
        <Sidebar
          {...props}
          closeSidebar={onClose}
          isOpen={isOpen}
          user={user}
          totalBalance={renderTotatBalance}
        />
      }
    >
      <Grid
        gap={4}
        templateColumns={{ base: "1fr", lg: "240px repeat(2, 1fr)" }}
        bg="orange"
      >
        <Switch>
          <Route
            path={`/`}
            render={(properties) => (
              <Suspense fallback={<Heading>Crypto Loading...</Heading>}>
                <Crypto
                  {...properties}
                  user={user}
                  totalBalance={renderTotatBalance}
                  deposits={user && userDeposits}
                  withdrawals={user && userWithdrawals}
                />
              </Suspense>
            )}
          />
          <Route
            path={`/${url}/desposit`}
            exact
            render={(properties) => (
              <Deposit {...properties} user={user} token={props.token} />
            )}
          />
          <Route path={`/${url}/invest`} exact component={Invest} />
          <Route
            path={`/${url}/withdraw`}
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
            path={`/${url}/admin`}
            exact
            render={(properties) => (
              <Admin {...properties} user={user} token={props.token} />
            )}
          />
          <Route
            path={`/${url}/account`}
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
        <Suspense fallback={<Heading>Chart Loading...</Heading>}>
          <Chart />
        </Suspense>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
