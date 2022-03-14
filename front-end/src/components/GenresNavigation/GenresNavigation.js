/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const GenresNavigation = () => {
  const [browsingGenre, setBrowsingGenre] = useState('Akcja');
  const [navWrapped, setNavWrapped] = useState(false);

  const handleActiveGenre = (e) => {
    setBrowsingGenre(e.target.textContent);
  };

  const handleNavWrap = () => {
    setNavWrapped(!navWrapped);
  };

  return (
    <Wrapper square>
      <Menu
        navWrapped={navWrapped}
        disablePadding
        onClick={(e) => handleActiveGenre(e)}
      >
        <StyledMenuItem active={browsingGenre === 'Akcja' ? 1 : 0}>
          <Typography variant="inherit">Akcja</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Thriller' ? 1 : 0}>
          <Typography variant="inherit">Thriller</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Horror' ? 1 : 0}>
          <Typography variant="inherit">Horror</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Fantasy' ? 1 : 0}>
          <Typography variant="inherit">Fantasy</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Sci-Fi' ? 1 : 0}>
          <Typography variant="inherit">Sci-Fi</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Przygodowy' ? 1 : 0}>
          <Typography variant="inherit">Przygodowy</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Dramat' ? 1 : 0}>
          <Typography variant="inherit">Dramat</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Kryminalny' ? 1 : 0}>
          <Typography variant="inherit">Kryminalny</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Animowany' ? 1 : 0}>
          <Typography variant="inherit">Animowany</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Wojenny' ? 1 : 0}>
          <Typography variant="inherit">Wojenny</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Romans' ? 1 : 0}>
          <Typography variant="inherit">Romans</Typography>
        </StyledMenuItem>
        <StyledMenuItem active={browsingGenre === 'Komedia' ? 1 : 0}>
          <Typography variant="inherit">Komedia</Typography>
        </StyledMenuItem>
      </Menu>
      <WrapMenuIcon>
        {navWrapped ? (
          <ArrowDropDownIcon
            onClick={handleNavWrap}
            sx={{ cursor: 'pointer' }}
            color="primary"
            fontSize="large"
          ></ArrowDropDownIcon>
        ) : (
          <ArrowDropUpIcon
            onClick={handleNavWrap}
            sx={{ cursor: 'pointer' }}
            color="primary"
            fontSize="large"
          ></ArrowDropUpIcon>
        )}
      </WrapMenuIcon>
      <Autocomplete
        freeSolo
        disableClearable
        options={['Uncharted', 'The Batman', 'Sing 2']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Szukaj filmu"
            variant="filled"
            size=""
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Wrapper>
  );
};

export default GenresNavigation;

const Wrapper = styled(Paper)`
  && {
    @media ${responsive.laptop} {
      margin: 0 auto;
      width: min-content;
    }
  }
`;

const Menu = styled(MenuList)`
  && {
    display: grid;
    grid-template-rows: ${({ navWrapped }) =>
      navWrapped ? 'repeat(1, 1fr) ' : 'repeat(3, 1fr)'};
    grid-template-columns: repeat(3, 1fr);
    border-radius: 0;

    @media ${responsive.tablet} {
      grid-template-rows: ${({ navWrapped }) =>
        navWrapped ? 'repeat(1, 1fr) ' : 'repeat(2, 1fr)'};
      grid-template-columns: repeat(4, 1fr);
    }

    @media ${responsive.laptop} {
      grid-template-rows: repeat(1, 1fr);
      grid-template-columns: repeat(12, 1fr);
    }
  }
  ${({ navWrapped }) => css`
    ${console.log(navWrapped)}

    & li:nth-child(n + 4) {
      display: ${navWrapped ? 'none' : 'grid'};
    }

    @media ${responsive.tablet} {
      & li:nth-child(-n + 4) {
        display: ${navWrapped && 'grid'};
      }
      & li {
        display: ${navWrapped && 'none'};
      }
    }
  `}
`;

const StyledMenuItem = styled(MenuItem)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xs};

    border-radius: 0;
    padding-top: 0.65rem;
    padding-bottom: 0.65rem;
    background: ${({ theme, active }) =>
      active === 1 ? `${theme.lightGray}` : '#fff'};

    @media ${responsive.desktop} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const WrapMenuIcon = styled.div`
  display: flex;
  justify-content: flex-end;

  @media ${responsive.laptop} {
    display: none;
  }
`;
