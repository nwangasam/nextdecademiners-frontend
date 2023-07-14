import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './containers/dashboard';
import { Grid, Spinner } from '@chakra-ui/core';

import './App.css';

const Signup = lazy(() => import('./pages/auth/Signup'));
const Login = lazy(() => import('./pages/auth/Login'));

const LandingPage = lazy(() => import('./pages/user/landing'));

class App extends React.Component {
  state = {
    isAuth: false,
    authLoading: false,
    userId: null,
    token: null,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      return this.logoutHandler();
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutologout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    console.log('You just logged out');
    this.props.history.replace('/')
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
      const response = await fetch(
        'https://nextdecademiners-backend.vercel.app/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: authData.email,
            password: authData.password,
          }),
        }
      );
      if (response.status === 422) {
        const result = await response.json();
        this.setState({ error: result.message, authLoading: false });
        return;
      }
      if (response.status !== 200 && response.status !== 201) {
        const result = await response.json();
        this.setState({ error: result.message, authLoading: false });
        return;
      }
      const { token, userId } = await response.json();
      this.setState({
        isAuth: true,
        token,
        userId,
        authLoading: false,
      });
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      const remainingMilliseconds = 60 * 60 * 1000 * 24;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutologout(remainingMilliseconds);
    } catch (err) {
      console.log(err);
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
      const res = await fetch(
        'https://nextdecademiners-backend.vercel.app/auth/signup',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: authData.name.value,
            email: authData.email.value,
            password: authData.password.value,
            confirmPassword: authData.confirmPassword.value,
            referalEmail: authData.referalEmail.value,
          }),
        }
      );
      if (res.status === 422) {
        const result = await res.json();
        this.setState({ error: result.data[0], authLoading: false });
        console.log(result.data[0]);
        return;
      }
      if (res.status !== 200 && res.status !== 201) {
        const result = await res.json();
        console.log(result.data[0]);
        this.setState({ error: result.data[0], authLoading: false });
        return;
      }
      // const result = await res.json();
      this.setState({ isAuth: false, authLoading: false });
      this.props.history.replace('/auth/login');
    } catch (err) {
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    }
  };

  handleError = () => {
    this.setState({ error: null, authLoading: false });
  };
  
  render() {
    let routes = (
      <Switch>
        <Route
          path='/auth/signup'
          exact
          render={(props) => (
            <Suspense
            fallback={
                <Grid p='absolute' h='100vh' bg='#152136' style={{ placeItems: 'center' }} >
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='yellow.500'
                    size='xl'
                  />
                </Grid>
              }
            >
              <Signup
                {...props}
                onSignup={this.signupHandler}
                loading={this.state.authLoading}
                error={this.state.error}
                handleError={this.handleError}
              />
            </Suspense>
          )}
        />
        <Route
          path='/auth/login'
          exact
          render={(props) => (
            <Suspense
              fallback={
                <Grid p='absolute' h='100vh' bg='#152136' style={{ placeItems: 'center' }}>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='yellow.500'
                    size='xl'
                  />
                </Grid>
              }
            >
              <Login
                {...props}
                onLogin={this.loginHandler}
                loading={this.state.authLoading}
                error={this.state.error}
                handleError={this.handleError}
              />
            </Suspense>
          )}
        />
        <Redirect from='/auth/login' to='/' />
        <Redirect from='/auth/signup' to='/' />
        <Route
          path='/'
          render={(props) => (
            <Suspense
              fallback={
                <Grid
                  p='absolute'
                  h='100vh'
                  style={{ placeItems: 'center' }}
                  bg='#152136'
                >
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='yellow.500'
                    size='xl'
                  />
                </Grid>
              }
            >
              <LandingPage {...props} />
            </Suspense>
          )}
        />
      </Switch>
    );

    if (this.state.isAuth) {
      routes = (
        <Switch>
          <Redirect from='/auth/login' to='/' />
          <Redirect from='/auth/signup' to='/' />
          <Route
            path='/'
            render={(props) => (
              <Suspense
                fallback={
                  <Grid p='absolute' h='100vh' bg='#152136' style={{ placeItems: 'center' }}>
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='yellow.500'
                      size='xl'
                    />
                  </Grid>
                }
              >
                <Dashboard
                  {...props}
                  userId={this.state.userId}
                  token={this.state.token}
                  logoutHandler={this.logoutHandler}
                />
              </Suspense>
            )}
          />
        </Switch>
      );
    }

    return <div>{routes}</div>;
  }
}

export default withRouter(App);
