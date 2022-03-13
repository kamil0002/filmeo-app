import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@mui/material';
import Typography from 'components/Typography/Typography';
import styled from 'styled-components';

const Footer = ({ dashboardView }) => {
  if (dashboardView) return '';

  return (
    <Wrapper>
      <Typography color="#fff" fontWeight={700} align="center">
        Aplikacje Internetowe - Kamil Noga
      </Typography>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  background: ${({ theme }) => lighten(theme.darkBlue, 0.15)};
  height: ${({ theme }) => theme.footerHeight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

Footer.propTypes = {
  dashboardView: PropTypes.bool,
};
