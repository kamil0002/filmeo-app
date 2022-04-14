import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import responsive from 'theme/responsive';

const DesktopNavigation = ({ children }) => {
  const location = useLocation();

  return (
    <Wrapper>
      <NavList>
        <ListItem active={location.pathname === '/'}>
          <Link to="/">Strona główna</Link>
        </ListItem>
        <ListItem active={location.pathname === '/filmy'}>
          <Link to="/filmy">Filmy</Link>
        </ListItem>
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

const ListItem = styled.li`
  margin: 0 0.5rem;
  padding: 0.4rem 1.35rem;
  transition: background-color 100ms ease-out;
  cursor: pointer;
  border-radius: 25px;
  background: ${({ theme, active }) =>
    active ? theme.primaryBlue : ' transparent'};

  a {
    text-decoration: none;
    color: ${({ theme, active }) =>
      active ? theme.primaryLight : theme.darkBlue};
  }

  &:hover {
    background-color: ${({ theme }) => theme.primaryBlue};

    a {
      color: ${({ theme }) => theme.primaryLight};
    }
  }
`;

DesktopNavigation.propTypes = {
  children: PropTypes.any,
};
