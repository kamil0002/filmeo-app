import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme/MainTheme';
import GlobalStyles from 'theme/GlobalStyles';
import Navigation from 'components/Navigation/Navigation';
import Home from 'views/Home';

const Root = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Navigation />
        <Content>
          <Home />
        </Content>
      </ThemeProvider>
    </>
  );
};

export default Root;

const Content = styled.div`
  padding-top: 67px;
`;
