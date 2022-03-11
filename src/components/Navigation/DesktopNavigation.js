import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import responsive from 'theme/Responsive';

const DesktopNavigation = ({ children }) => {
  return (
    <Wrapper>
      <NavList>
        <span>
          <li>Home</li>
        </span>
        <span>
          <li>Movies</li>
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
  margin-right: 4rem;
  list-style: none;
  align-items: center;

  li {
    margin: 0 0.5rem;
    padding: 0.4rem 1.2rem;
    transition: background-color 100ms ease-out;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.lightBlue};
    }
  }
`;

DesktopNavigation.propTypes = {
  children: PropTypes.array.isRequired,
};
