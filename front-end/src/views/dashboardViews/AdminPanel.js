import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';

const AdminPanel = () => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedReview, setSelectedReview] = useState('');
  const [selectedToUnban, setSelectedToUnban] = useState('Zablokowani');

  const {
    register: registerOpinionDelete,
    handleSubmit: handleSubmitOpinionDelete,
    formState: { errors: errors1 },
  } = useForm({ shouldFocusError: false });

  const {
    register: registerUserBlock,
    handleSubmit: handleSubmitUserBlock,
    formState: { errors: errors2 },
  } = useForm({ shouldFocusError: false });

  const deleteOption = (data) => console.log(data);

  const blockUser = (data) => console.log(data);

  return (
    <>
      <Typography fontWeight={700}>Panel Admina</Typography>
      <StyledForm>
        <Typography marginTop={3}>Usuwanie Filmów</Typography>
        <FormControl sx={{ marginY: 2 }}>
          <InputLabel id="movie">Film</InputLabel>
          <StyledSelect
            labelId="movie"
            id="movie-select"
            value={selectedMovie}
            label="Film"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setSelectedMovie(e.target.value)}
          >
            <MenuItem value={'Uncharted'}>Uncharted</MenuItem>
            <MenuItem value={'The Batman'}>The Batman</MenuItem>
            <MenuItem value={'Sing 2'}>Sing 2</MenuItem>
          </StyledSelect>
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', fontFamily: 'Poppins' }}
          variant="outlined"
        >
          Usuń film
        </StyledButton>
        <Typography
          color="#C02020"
          sx={{ marginTop: 2, fontWeight: 600, fontSize: 11 }}
        >
          Uwaga! Film zostanie usunięty łącznie z wszystkimi wypożyczeniami oraz
          recenzjami!
        </Typography>
      </StyledForm>
      <DeleteReviewWrapper>
        <Typography marginTop={3}>Usuń opinię</Typography>
        <Form
          submitFn={handleSubmitOpinionDelete(deleteOption())}
          buttonText="Szukaj"
          buttonType="outlined"
        >
          <FormInput
            validator={{
              ...registerOpinionDelete('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
              }),
            }}
            id="email"
            label="Adres E-Mail"
            type="email"
            isValid={errors1.email ? true : false}
            helperText="Adres E-mail nie poprawny"
          />
        </Form>
        <FormControl sx={{ marginY: 3 }}>
          <InputLabel id="review">Opinie</InputLabel>
          <StyledSelect
            labelId="review"
            id="user-reviews"
            value={selectedReview}
            label="Opinie"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setSelectedReview(e.target.value)}
            disabled
          >
            <MenuItem value={'Uncharted'}>Recenzja 1...</MenuItem>
            <MenuItem value={'The Batman'}>Recenzja 2...</MenuItem>
            <MenuItem value={'Sing 2'}>Recenzja 3...</MenuItem>
          </StyledSelect>
        </FormControl>
        <StyledButton
          sx={{ alignSelf: 'baseline', fontFamily: 'Poppins' }}
          variant="outlined"
          disabled
        >
          Usuń
        </StyledButton>
      </DeleteReviewWrapper>
      <BlockUserWrapper>
        <Typography marginTop={3}>Zablokuj użytkownika</Typography>
        <Form
          submitFn={handleSubmitUserBlock(blockUser())}
          buttonText="Szukaj"
          buttonType="outlined"
        >
          <FormInput
            validator={{
              ...registerUserBlock('email', {
                required: true,
                pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i,
              }),
            }}
            id="email"
            label="Adres E-Mail"
            type="email"
            isValid={errors2.email ? true : false}
            helperText="Adres E-mail nie poprawny"
          />
        </Form>
      </BlockUserWrapper>

      <UnblockUserWrapper>
        <Typography marginTop={3} marginBottom={3}>
          Odblokuj użytkownika
        </Typography>
        <FormControl>
          <StyledSelect
            labelId="blocked"
            id="blocked-users"
            value={selectedToUnban}
            label="Zablokowani"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
            onChange={(e) => setSelectedToUnban(e.target.value)}
          >
            <MenuItem value={'laura@example.com'}>laura@example.com.</MenuItem>
            <MenuItem value={'john@example.com'}>Recenzja 2...</MenuItem>
            <MenuItem value={'adam@example.com'}>Recenzja 3...</MenuItem>
          </StyledSelect>
        </FormControl>
      </UnblockUserWrapper>
    </>
  );
};

export default AdminPanel;

const StyledForm = styled.form`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;

  &:not(:nth-of-type(0)) {
    margin-top: 2rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    display: block;
    font-size: ${({ theme }) => theme.fontSize.xs};

    @media ${responsive.mobile} {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 150px;

    @media ${responsive.mobileM} {
      width: 200px;
    }
  }
`;

const DeleteReviewWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 5rem;
`;

const BlockUserWrapper = styled(DeleteReviewWrapper)``;

const UnblockUserWrapper = styled(BlockUserWrapper)``;
