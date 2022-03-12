import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paper, Typography } from '@mui/material';
import responsive from 'theme/responsive';

const DashboardTemplate = ({ children }) => {
  return (
    <StyledPaper>
      <Sidebar>
        <User>
          <img src="/images/user.png" alt="user" />
          <UserName marginTop={2} fontFamily="Poppins" fontWeight={500}>
            Kamil Noga
          </UserName>
        </User>
        <Navigation>
          <NavigationList>
            <NavigationItem>
              <img src="images/nav-movie.svg" />
              <span>Filmy</span>
            </NavigationItem>
            <NavigationItem>
              <img src="images/nav-reviews.svg" />
              <span>Oceny</span>
            </NavigationItem>
            <NavigationItem>
              <img src="images/nav-payments.svg" />
              <span>Wydatki</span>
            </NavigationItem>
            <NavigationItem>
              <img src="images/nav-settings.svg" />
              <span>Ustawienia</span>
            </NavigationItem>
            <NavigationItem>
              <img src="images/nav-admin.svg" />
              <span>Panel Admina</span>
            </NavigationItem>
          </NavigationList>
        </Navigation>
      </Sidebar>
      <Content>{children}</Content>
    </StyledPaper>
  );
};

export default DashboardTemplate;

const StyledPaper = styled(Paper)`
  && {
    width: 95%;
    margin: 5rem auto;
    height: 700px;
    border-radius: 15px;
    background: #ffffff;
    box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.25);
    display: flex;

    @media ${responsive.laptop} {
      width: 70%;
    }
  }
`;

const Sidebar = styled.div`
  width: 100px;
  height: 100%;
  background: ${({ theme }) => theme.primaryLight};
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media ${responsive.tablet} {
    width: 200px;
  }
`;

const User = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin-top: 3rem;
    border-radius: 50%;
    filter: drop-shadow(2px 4px 30px rgba(0, 0, 0, 0.25));
    object-fit: cover;
  }

  @media ${responsive.tablet} {
  }
`;

const UserName = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xs};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const Navigation = styled.nav`
  height: 80%;
`;

const NavigationList = styled.ul`
  list-style: none;
  margin-top: 5rem;
`;
const NavigationItem = styled.li`
  display: flex;
  padding: 1rem 0;
  align-items: center;
  justify-content: flex-start;

  span {
    display: none;
  }

  @media ${responsive.tablet} {
    span {
      display: block;
      margin-left: 0.5rem;
    }
  }

  &::before {
    content: '';
    left: 0;
    right: 0;
    width: 100px;
    position: absolute;
    height: 64px;
    transition: all 250ms ease-out;
    cursor: pointer;

    @media ${responsive.tablet} {
      width: 200px;
    }
  }

  &:hover {
    &::before {
      background: rgb(0 0 0 / 20%);
    }
  }
`;

const Content = styled.div`
  padding: 2rem;
  width: calc(100% - 100px);

  @media ${responsive.tablet} {
    width: calc(100% - 200px);
  }
`;

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
