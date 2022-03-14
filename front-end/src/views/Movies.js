import GenresNavigation from 'components/GenresNavigation/GenresNavigation';
import React from 'react';
import styled from 'styled-components';

const Movies = () => {
  return (
    <Wrapper>
      <GenresNavigation />
    </Wrapper>
  );
};

export default Movies;

const Wrapper = styled.div`
  min-height: calc(100vh - 76px - 70px);
`;
