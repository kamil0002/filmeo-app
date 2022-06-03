/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';
import { Button, Grid, TextField } from '@mui/material';
import { setAddMovieViewVisible } from 'slices/moviesSlice';

const AddMovie = () => {
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    genres: '',
    age_limit: '',
    description: '',
    short_description: '',
    director: '',
    release_date: '',
    running_time: '',
    poster: '',
    movie_url: '',
    trailer_url: '',
    details_url: '',
    cost: '',
  });

  const dispatch = useDispatch();

  const handleFormDataChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <Close onClick={() => dispatch(setAddMovieViewVisible(false))} />
      <Form onSubmit={onSubmit}>
        <Typography sx={{ fontWeight: 700, fontSize: 24, my: 5 }}>
          Dodawanie filmu
        </Typography>
        <Grid
          container
          sx={{ maxWidth: 1000 }}
          rowSpacing={3.5}
          columnSpacing={3}
        >
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%', mx: 'auto' }}
              id="title"
              name="title"
              label="Tytuł"
              onChange={handleFormDataChange}
              value={formData.title}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="genres"
              name="genres"
              label="Gatunki"
              onChange={handleFormDataChange}
              value={formData.genres}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="director"
              name="director"
              label="Reżyser"
              onChange={handleFormDataChange}
              value={formData.director}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="running_time"
              type="number"
              name="running_time"
              label="Czas trwania"
              onChange={handleFormDataChange}
              value={formData.running_time}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="description"
              name="description"
              label="Opis"
              multiline={true}
              rows={5}
              onChange={handleFormDataChange}
              value={formData.description}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="short_description"
              name="short_description"
              rows={5}
              multiline={true}
              label="Krótki opis"
              onChange={handleFormDataChange}
              value={formData.short_description}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="cost"
              name="cost"
              label="Koszt"
              onChange={handleFormDataChange}
              value={formData.cost}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="age_limit"
              name="age_limit"
              label="Limit wiekowy"
              onChange={handleFormDataChange}
              value={formData.age_limit}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                alignItems: 'stretch',
                width: '90%',
              }}
            >
              <label style={{ fontSize: 14, color: '#828282' }}>
                Data wydania
              </label>
              <TextField
                variant="filled"
                id="release_date"
                name="release_date"
                type="date"
                onChange={handleFormDataChange}
                value={formData.release_date}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="trailer_url"
              name="trailer_url"
              label="URL zwiastuna"
              onChange={handleFormDataChange}
              value={formData.trailer_url}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="details_url"
              name="details_url"
              label="URL detali"
              onChange={handleFormDataChange}
              value={formData.details_url}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <TextField
              variant="filled"
              sx={{ width: '90%' }}
              id="movie_url"
              name="movie_url"
              label="URL filmu"
              onChange={handleFormDataChange}
              value={formData.movie_url}
            />
          </Grid>
          <Grid
            item
            xs={11}
            sm={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                alignItems: 'stretch',
                width: '90%',
              }}
            >
              <label style={{ fontSize: 14, color: '#828282' }}>Plakat</label>
              <TextField
                variant="filled"
                sx={{ width: '90%' }}
                id="poster"
                name="poster"
                type="file"
              />
            </div>
          </Grid>
        </Grid>
        <Button
          size="large"
          variant="contained"
          sx={{ marginTop: 8, marginBottom: 10 }}
          type="submit"
        >
          Dodaj
        </Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.navHeight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ theme }) => theme.secondaryLight};
  z-index: 100;
`;

const Form = styled.form`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Close = styled(CloseIcon)`
  && {
    position: absolute;
    right: 2%;
    top: 2%;
    cursor: pointer;
  }
`;

export default AddMovie;
