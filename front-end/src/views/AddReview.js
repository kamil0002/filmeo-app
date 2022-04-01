/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FormControl, Paper, Rating } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import Lottie from 'react-lottie';
import lottieAnimation from 'lotties/review-lottie.json';
import axios from 'utils/axios';
import Alert from 'components/Alert/Alert';
import { useParams } from 'react-router-dom';

const AddReview = () => {
  const [ratingValue, setRatingValue] = useState(0);
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const params = useParams();

  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
  });
  const onSubmit = async (data) => {
    try {
      console.log(data);
      console.log(ratingValue);
      const review = await axios.post(`/api/v1/reviews/movie/${params.slug}`, {
        title: data.title,
        description: data.description,
        rating: +ratingValue,
      });
      console.log(review);

      if (review.data.status !== 'success') {
        throw new Error(review.data.message);
      }
    } catch (err) {
      setErrMessage(err.message);
      setTimeout(() => {
        setSuccessMessage(null);
        setErrMessage(null);
      }, 5000);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Wrapper>
      {errMessage && <Alert>{errMessage}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}
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
        <Form
          submitFn={handleSubmit(onSubmit)}
          buttonText="Dodaj"
          processing={processing}
        >
          <FormInput
            validator={{
              ...register('title', {
                required: true,
                minLength: 5,
              }),
            }}
            id="title"
            label="Tytuł"
            isValid={errors.surname ? true : false}
            helperText="Podaj tytuł o długości co najmniej 5 znaków"
          />
          <FormInput
            validator={{
              ...register('description', {
                required: true,
                minLength: 15,
              }),
            }}
            type="text"
            multiline
            rows={5}
            id="title"
            label="Opis"
            isValid={errors.surname ? true : false}
            helperText="Podaj opis o długości co najmniej 15 znaków"
          />
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

// const StyledForm = styled(Form)`
//   display: flex;
//   flex-direction: column;
// `;

const StyledTextField = styled(TextField)`
  @media ${responsive.tablet} {
    width: 350px;
  }
`;
