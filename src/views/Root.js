import React from 'react';
import { ThemeProvider } from 'styled-components';
import Navigation from 'components/Navigation/Navigation';
import theme from 'theme/MainTheme';
import GlobalStyles from 'theme/GlobalStyles';

const Root = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </>
  );
};

export default Root;
