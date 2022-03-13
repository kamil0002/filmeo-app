import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paper, Typography } from '@mui/material';
import responsive from 'theme/responsive';

const DashboardTemplate = ({ children, handleViewChange, currentView }) => {
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
            <NavigationItem
              currentView={currentView === 'movies'}
              onClick={() => handleViewChange('movies')}
            >
              <img src=".././images/nav-movie.svg" />
              <span>Filmy</span>
            </NavigationItem>
            <NavigationItem
              currentView={currentView === 'reviews'}
              onClick={() => handleViewChange('reviews')}
            >
              <img src=".././images/nav-reviews.svg" />
              <span>Oceny</span>
            </NavigationItem>
            <NavigationItem
              currentView={currentView === 'payments'}
              onClick={() => handleViewChange('payments')}
            >
              <img src=".././images/nav-payments.svg" />
              <span>Wydatki</span>
            </NavigationItem>
            <NavigationItem
              currentView={currentView === 'settings'}
              onClick={() => handleViewChange('settings')}
            >
              <img src=".././images/nav-settings.svg" />
              <span>Ustawienia</span>
            </NavigationItem>
            <NavigationItem
              currentView={currentView === 'admin'}
              onClick={() => handleViewChange('admin')}
            >
              <img src=".././images/nav-admin.svg" />
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
    height: 1000px;
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
  width: 80px;
  height: 100%;
  background: ${({ theme }) => theme.primaryLight};
  border-radius: 15px 0 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media ${responsive.mobile} {
    width: 100px;
  }

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
    width: 40px;
    height: 40px;
    margin-top: 3rem;
    border-radius: 50%;
    filter: drop-shadow(2px 4px 30px rgba(0, 0, 0, 0.25));
    object-fit: cover;
  }

  @media ${responsive.mobile} {
    img {
      width: 48px;
      height: 48px;
    }
  }
`;

const UserName = styled(Typography)`
  && {
    font-size: 0.6rem;

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
  text-decoration: none;
  color: ${({ theme }) => theme.darkBlue};

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
    width: 80px;
    position: absolute;
    height: 64px;
    transition: all 250ms ease-out;
    cursor: pointer;
    border-right: 3px solid transparent;
    border-right: ${({ currentView }) => currentView && '3px solid #85B6FF'};

    @media ${responsive.mobile} {
      width: 100px;
    }

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
  padding: 2rem 1rem 2rem 1.2rem;
  width: calc(100% - 100px);

  @media ${responsive.tablet} {
    width: calc(100% - 200px);
  }
`;

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  handleViewChange: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};
