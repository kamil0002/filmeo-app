import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import responsive from 'theme/responsive';

const DesktopNavigation = ({ children }) => {
  return (
    <Wrapper>
      <NavList>
        <span>
          <li>
            <Link to="/">Strona główna</Link>
          </li>
        </span>
        <span>
          <li>
            <Link to="/filmy">Filmy</Link>
          </li>
        </span>
      </NavList>
      {children}
    </Wrapper>
  );
};

export default DesktopNavigation;

const Wrapper = styled.div`
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

  li {
    margin: 0 0.5rem;
    padding: 0.25rem 0.9rem;
    transition: background-color 100ms ease-out;
    cursor: pointer;

    a {
      text-decoration: none;
      color: ${({ theme }) => theme.darkBlue};
    }

    &:hover {
      background-color: ${({ theme }) => theme.lightBlue};
    }
  }
`;

DesktopNavigation.propTypes = {
  children: PropTypes.array.isRequired,
};
