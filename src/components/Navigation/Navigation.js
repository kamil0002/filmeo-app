import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button';
import MobileNavigation from './MobileNavigation';
import responsive from 'theme/Responsive';
import DesktopNavigation from './DesktopNavigation';

const Navigation = () => {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <Wrapper>
      <Brand>
        <LiveTvIcon fontSize="inherit" color="primary" />
        <Title>Movie Rental</Title>
      </Brand>
      <Actions>
        <DesktopNavigation>
          <StyledButton
            variant="contained"
            classes={{ root: 'root' }}
            color="primary"
            spacing="true"
          >
            Log In
          </StyledButton>
          <StyledButton
            variant="contained"
            classes={{ root: 'root' }}
            color="primary"
            spacing="true"
          >
            Sign Up
          </StyledButton>
        </DesktopNavigation>
        <HamburgerMenu
          classes={{ root: 'root' }}
          onClick={() => setNavVisible(!navVisible)}
        />
      </Actions>
      <MobileNavigation visible={navVisible}>
        <StyledButton
          variant="contained"
          classes={{ root: 'root' }}
          color="primary"
        >
          Log In
        </StyledButton>
        <StyledButton
          variant="contained"
          classes={{ root: 'root' }}
          color="primary"
        >
          Sign Up
        </StyledButton>
      </MobileNavigation>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.primaryLight};
  padding: 1.4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  position: fixed;
  right: 0;
  left: 0;
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxl};
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-left: 1rem;
`;

const Actions = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HamburgerMenu = styled(MenuRoundedIcon)`
  &.root {
    font-size: ${({ theme }) => theme.fontSize.xxl};
    cursor: pointer;

    @media ${responsive.tablet} {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  &.root {
    font-family: inherit;
    width: 100px;
    height: 35px;
    font-size: ${({ theme }) => theme.fontSize.s};
    margin: 1rem 0;

    ${({ spacing }) =>
      spacing &&
      css`
        margin: 0 2rem;
      `}
  }
`;
