/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme/MainTheme';
import GlobalStyles from 'theme/GlobalStyles';
import Navigation from 'components/Navigation/Navigation';
import Home from 'views/Home';
import Footer from 'components/Footer/Footer';
import routes from 'routes';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const Root = () => {
  const location = useLocation();

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Navigation />
        <Content>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Routes>
        </Content>
        <Footer dashboardView={location.pathname === '/profil:action'} />
      </ThemeProvider>
    </>
  );
};

export default Root;

const Content = styled.div`
  padding-top: ${({ theme }) => theme.navHeight};
`;
