import React from 'react';
import { Grid } from '@chakra-ui/core';

const Layout = (props) => {
  const headerSettings = {
    w: 'full',
    pos: 'fixed',
    zIndex: 'toast',
    left: '0',
    top: '0'
  }

  const mainSettings = {
    // mt: '6rem',
    // p: { base: '0 1rem', md: '0 1rem' }
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <Grid as='header' {...headerSettings}>
        {props.header}
      </Grid>
      <Grid as='main' {...mainSettings}>
        {props.children}
      </Grid>
    </div>
  );
};

export default Layout;
