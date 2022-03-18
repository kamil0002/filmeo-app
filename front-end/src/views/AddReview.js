import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, FormControl, Paper, Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import Lottie from 'react-lottie';
import lottieAnimation from 'lotties/review-lottie.json';

const AddReview = () => {
  const [ratingValue, setRatingValue] = useState(0);

  return (
    <Wrapper>
      <StyledPaper elevation={8}>
        <Typography
          fontFamily="Poppins"
          textTransform={'uppercase'}
          fontWeight={700}
          align={'center'}
          marginBottom={3}
        >
          Dodaj opinię
        </Typography>
        <Lottie
          height={150}
          width={150}
          speed={0.75}
          options={{
            loop: true,
            autoplay: true,
            animationData: lottieAnimation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
        <Form>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="review-title"
              label="Tytuł"
              type="text"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <StyledTextField
              id="description"
              multiline
              rows={5}
              label="Opis"
              type="text"
              autoComplete="off"
              variant="standard"
            />
          </FormControl>
          <FormControl required={true} margin="normal">
            <Typography
              component="legend"
              color="text.secondary"
              marginBottom={0.5}
            >
              Ocena
            </Typography>
            <Rating
              name="movie-rating"
              value={ratingValue}
              precision={0.5}
              sx={{ marginLeft: -0.5 }}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
          </FormControl>
          <Button
            sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
            variant="contained"
          >
            Dodaj
          </Button>
        </Form>
      </StyledPaper>
    </Wrapper>
  );
};

export default AddReview;

const Wrapper = styled.div`
  min-height: calc(100vh - 76px - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  @media ${responsive.tablet} {
    margin: 4rem 0;
  }
`;

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3rem;
  width: 96vw;

  @media ${responsive.mobile} {
    width: 80vw;
  }

  @media ${responsive.mobileM} {
    width: 65vw;
  }

  @media ${responsive.tablet} {
    width: 53vw;
  }

  @media ${responsive.laptop} {
    width: 40vw;
  }

  @media ${responsive.desktop} {
    width: 30vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  @media ${responsive.tablet} {
    width: 350px;
  }
`;
