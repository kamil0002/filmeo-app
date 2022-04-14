import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import responsive from 'theme/responsive';
import routes from 'routes';
import NavItem from './NavItem';

const DesktopNavigation = ({ children }) => {
  const location = useLocation();

  return (
    <Wrapper>
      <NavList>
        {/* <ListItem active={location.pathname === '/'}> */}
        <NavItem
          desktop
          as={Link}
          to={routes.home}
          active={location.pathname === routes.home}
        >
          Strona główna
        </NavItem>
        <NavItem
          desktop
          to={routes.movies}
          as={Link}
          active={location.pathname === routes.movies}
        >
          Filmy
        </NavItem>
      </NavList>
      {children}
    </Wrapper>
  );
};

export default DesktopNavigation;

const Wrapper = styled.nav`
  display: none;
  justify-content: space-between;
  align-items: center;

  @media ${responsive.tablet} {
    display: flex;
  }
`;

const NavList = styled.ul`
  display: flex;
  margin-right: 1.5rem;
  list-style: none;
  align-items: center;
`;

DesktopNavigation.propTypes = {
  children: PropTypes.any,
};
