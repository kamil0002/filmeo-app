import React from 'react';
import styled from 'styled-components';
import Slider from 'components/Slider/ImgSlider';

const Home = () => {
  return (
    <Wrapper>
      <Slider />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  overflow-x: hidden;
  position: relative;
  min-height: calc(100vh - 67px);
`;
