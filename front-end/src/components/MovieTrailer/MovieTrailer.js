import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import responsive from 'theme/responsive';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';

const MovieTrailer = () => {
  const [videoVolume, setVideoVolume] = useState(0.05);

  return (
    <Wrapper>
      <VideoActions>
        <VolumeUpBtn
          onClick={() => setVideoVolume((prevVolume) => prevVolume + 0.05)}
        />
        <VolumeDownBtn
          onClick={() => setVideoVolume((prevVolume) => prevVolume - 0.05)}
        />
      </VideoActions>
      <ReactPlayer
        loop={true}
        playing={true}
        playIcon={true}
        volume={videoVolume}
        width="100%"
        height="100%"
        url="https://www.youtube.com/watch?v=mqqft2x_Aa4"
        controls={false}
      />
    </Wrapper>
  );
};

export default MovieTrailer;

const Wrapper = styled.div`
  position: relative;
  margin-top: calc(0px - 9vw);
  width: 100%;
  height: 85vmin;
  clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);
  -webkit-clip-path: polygon(0 9vw, 100% 0, 100% calc(100% - 9vw), 0 100%);

  @media ${responsive.desktop} {
    width: 95vw;
  }
`;

const VideoActions = styled.div`
  position: absolute;
  bottom: 15%;
  right: 2%;
  color: ${({ theme }) => theme.primaryLight};
  opacity: 0.5;

  @media ${responsive.desktop} {
    bottom: 22%;
  }
`;

const VolumeUpBtn = styled(AddCircleOutlinedIcon)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xl};
    cursor: pointer;
  }
`;

const VolumeDownBtn = styled(RemoveCircleOutlinedIcon)`
  && {
    font-size: ${({ theme }) => theme.fontSize.xl};
    cursor: pointer;
  }
`;