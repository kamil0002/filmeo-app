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
  padding: 0.25rem 0.9rem;
  transition: background-color 100ms ease-out;
  cursor: pointer;
  background: ${({ theme, active }) =>
    active ? theme.lightBlue : ' transparent'};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.darkBlue};
  }

  &:hover {
    background-color: ${({ theme }) => theme.lightBlue};
  }
`;

DesktopNavigation.propTypes = {
  children: PropTypes.node.isRequired,
};
