import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MobileNavigation = ({ children, visible }) => {
  const location = useLocation();

  return (
    <>
      <Wrapper visible={visible}>
        {children}
        <MobileNavList>
          <ListItem active={location.pathname === '/'}>
            <Link to="/">Strona główna</Link>
          </ListItem>
          <ListItem active={location.pathname === '/filmy'}>
            <Link to="/filmy">Filmy</Link>
          </ListItem>
        </MobileNavList>
      </Wrapper>
    </>
  );
};

export default MobileNavigation;

const Wrapper = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.secondaryLight};
  border-left: 1px solid ${({ theme }) => theme.lightBlue};
  transition: all 500ms ease-out;
  transform: ${({ visible }) =>
    visible ? 'translateX(0)' : 'translateX(100%)'};
`;

const MobileNavList = styled.ul`
  width: 70%;
  border-top: 1px solid ${({ theme }) => theme.darkGray};
  margin-top: 2rem;
  padding: 2rem 0;
  text-align: center;
`;

const ListItem = styled.li`
  margin: 1rem 0;
  list-style: none;
  cursor: pointer;
  padding: 1rem 0;
  transition: all 250ms ease-in;
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

MobileNavigation.propTypes = {
  children: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
};
