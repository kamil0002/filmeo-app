import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from '@mui/material/Button';
import MobileNavigation from './MobileNavigation';
import responsive from 'theme/responsive';
import DesktopNavigation from './DesktopNavigation';
import Typography from 'components/Typography/Typography';

const Navigation = ({ display }) => {
  const [navVisible, setNavVisible] = useState(false);

  if (!display) return '';

  return (
    <Wrapper>
      <Brand>
        <LiveTvIcon fontSize="inherit" color="primary" />
        <Title
          variant="h5"
          fontWeight="bold"
          component="h2"
          marginLeft="1.2rem"
        >
          Filmeo
        </Title>
      </Brand>
      <Actions>
        <DesktopNavigation>
          <StyledButton
            variant="contained"
            classes={{ root: 'root' }}
            color="primary"
            spacing="true"
            LinkComponent={Link}
            to="/logowanie"
          >
            Logowanie
          </StyledButton>
          <StyledButton
            variant="contained"
            classes={{ root: 'root' }}
            color="primary"
            spacing="true"
            LinkComponent={Link}
            to="/rejestracja"
          >
            Rejestracja
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
          LinkComponent={Link}
          to="/logowanie"
        >
          Logowanie
        </StyledButton>
        <StyledButton
          variant="contained"
          classes={{ root: 'root' }}
          color="primary"
          LinkComponent={Link}
          to="/rejestracja"
        >
          Rejestracja
        </StyledButton>
      </MobileNavigation>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.primaryLight};
  padding: 0 0.4rem 0 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  position: fixed;
  right: 0;
  left: 0;
  z-index: 50;
  height: ${({ theme }) => theme.navHeight};

  @media ${responsive.laptop} {
    padding: 0 2rem 0 2rem;
  }
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  display: flex;
  align-items: center;

  @media ${responsive.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Title = styled(Typography)`
  && {
    font-family: 'Lobster', cursive;
    color: ${({ theme }) => theme.primaryBlue};
    letter-spacing: 3px;
    font-size: ${({ theme }) => theme.fontSize.m};

    @media ${responsive.laptop} {
      font-size: ${({ theme }) => theme.fontSize.xl};
    }
  }
`;

const Actions = styled.div`
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HamburgerMenu = styled(MenuRoundedIcon)`
  &.root {
    font-size: ${({ theme }) => theme.fontSize.xl};
    cursor: pointer;

    @media ${responsive.tablet} {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  &.root {
    font-family: inherit;
    width: 140px;
    height: 35px;
    font-size: ${({ theme }) => theme.fontSize.s};
    margin: 1rem 0;

    ${({ spacing }) =>
      spacing &&
      css`
        margin: 0.5rem;

        @media ${responsive.laptop} {
          margin: 0 1rem;
        }
      `}
  }
`;

Navigation.propTypes = {
  display: PropTypes.bool,
};

Navigation.defaultProps = {
  display: true,
};
