import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Typography from 'components/Typography/Typography';
import { Button, Grid, TextField } from '@mui/material';
import { setAddMovieViewVisible } from 'slices/moviesSlice';
import axios from 'utils/axios';
import Alert from 'components/Alert/Alert';
import clearAsyncMessages from 'utils/clearAsyncMessages';

const initialFormData = {
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
};

const AddMovie = () => {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const genres = await axios.get('/api/v1/genres');
      setAvailableGenres(genres.data.data[0]);
    } catch (err) {
      console.err(err.message);
    }
  }, []);

  const handleFormDataChange = (e) => {
    if (e.target.name === 'poster') {
      setFormData((prevState) => ({ ...prevState, poster: e.target.files[0] }));
    } else
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      for (const el in formData) {
        if (formData[el] === '') {
          throw new Error('Uzupełnij poprawnie dane!');
        }
      }

      const data = new FormData();
      formData['genres'] = formData['genres'].trim();
      formData['genres'] = formData['genres'].split(',');

      formData['genres'] = formData['genres'].map((g) => {
        const str = `${g[0].toUpperCase()}${g.slice(1).toLowerCase()}`;
        return str.trim();
      });

      for (const el in formData) {
        data.append(el, formData[el]);
      }
      const newMovie = await axios.post('/api/v1/movies', data);

      if (newMovie.data.status !== 'success') {
        throw new Error(newMovie.data.message);
      }

      setSuccessMessage('Film został dodany!');
      setFormData(initialFormData);
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      clearAsyncMessages(setSuccessMessage, setErrMessage);
      formData['genres'] = formData['genres'].join(',');
    }
  };

  return (
    <>
      {errMessage && <Alert>{errMessage}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                <TextField
                  variant="filled"
                  sx={{ width: '90%' }}
                  id="genres"
                  name="genres"
                  label="Gatunki"
                  onChange={handleFormDataChange}
                  value={formData.genres}
                />
                <AvailableGenresElement>
                  Maks 3 z{' '}
                  {availableGenres.map(
                    (g, i) =>
                      `${g.name}${i === availableGenres.length - 1 ? '' : ', '}`
                  )}
                  <b> oddzielone ,</b>
                </AvailableGenresElement>
              </div>
            </Grid>
            <Grid
              item
              xs={11}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
              }}
            >
              <TextField
                variant="filled"
                sx={{ width: '90%' }}
                id="cost"
                name="cost"
                label="Koszt"
                type="number"
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
                alignItems: 'flex-start',
              }}
            >
              <TextField
                variant="filled"
                sx={{ width: '90%' }}
                id="age_limit"
                name="age_limit"
                label="Limit wiekowy"
                type="number"
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                  sx={{ width: '100%' }}
                  id="poster"
                  name="poster"
                  type="file"
                  onChange={handleFormDataChange}
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
    </>
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

const AvailableGenresElement = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.darkGray};
`;

export default AddMovie;
