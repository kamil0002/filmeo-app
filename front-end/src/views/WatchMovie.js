import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const WatchMovie = () => {
  const [infoVisible, setInfoVisible] = useState(true);
  const [infoFirstTimeShown, setInfoFirstTimeShown] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setInfoVisible(false);
        setInfoFirstTimeShown(true);
      },
      infoFirstTimeShown ? 7000 : 3000
    );
  }, [infoVisible]);

  useEffect(() => {
    window.addEventListener('mousemove', () => {
      setInfoVisible(true);
    });
  });

  return (
    <>
      <Information className="frame" infoVisible={infoVisible ? 1 : 0}>
        Naciśnij F11 aby wypełnić/pomniejszyć wyświetlany obraz
      </Information>
      <Movie log src="https://userload.co/embed/0cf245531139" />
    </>
  );
};

export default WatchMovie;

const Movie = styled.iframe`
  width: 100vw;
  height: 100vh;
  border: 0;
  padding: 0;
`;

const Information = styled(Typography)`
  && {
    opacity: ${({ infoVisible }) => (infoVisible ? 1 : 0)};
    transition: opacity 250ms ease;
    user-select: none;
    left: 0;
    right: 0;
    text-align: center;
    position: fixed;
    top: 25%;
    z-index: 1;
    font-weight: ${({ theme }) => theme.fontBold};
    color: ${({ theme }) => theme.primaryLight};
    font-size: ${({ theme }) => theme.fontSize.sm};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.m};
    }

    @media ${responsive.desktop} {
      font-size: ${({ theme }) => theme.fontSize.lg};
    }
  }
`;
