/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from 'slices/authSlice';
import theme from 'theme/MainTheme';
import GlobalStyles from 'theme/GlobalStyles';
import Navigation from 'components/Navigation/Navigation';
import Home from 'views/Home';
import Footer from 'components/Footer/Footer';
import routes from 'routes';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import AddReview from './AddReview';
import WatchMovie from './WatchMovie';
import axios from 'utils/axios';

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const user = await axios.get('/api/v1/isLoggedIn');
      dispatch(setUser(user.data));
    } catch (err) {
      console.log(err.message);
      Cookies.remove('token', { path: '' });
    }
  }, []);
  return (
    <>
      <GlobalStyles movieView={location.pathname.endsWith('ogladaj') ? 1 : 0} />
      <ThemeProvider theme={theme}>
        <Navigation display={!location.pathname.endsWith('ogladaj')} />
        <Content movieView={location.pathname.endsWith('ogladaj') ? 1 : 0}>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.movies} element={<Movies />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.movieDetails} element={<MovieDetails />} />
            <Route path={routes.addReview} element={<AddReview />} />
            <Route path={routes.watchMovie} element={<WatchMovie />} />
          </Routes>
        </Content>
        <Footer
          display={
            location.pathname !== '/profil:action' ||
            !location.pathname.endsWith('ogladaj')
          }
        />
      </ThemeProvider>
    </>
  );
};

export default Root;

const Content = styled.div`
  padding-top: ${({ theme, movieView }) => (movieView ? 0 : theme.navHeight)};
  min-height: calc(100vh - 70px);
`;
