/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled as styledMUI } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import Alert from 'components/Alert/Alert';
import Typography from 'components/Typography/Typography';
import clearAsyncMessages from 'utils/clearAsyncMessages';
import axios from 'axios';

const StyledTableCell = styledMUI(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableComponent = ({ rows, dataType, headings, getChangedRow }) => {
  const [selectedID, setSelectedID] = useState(null);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [poster, setPoster] = useState(null);

  const [showForm, setshowForm] = useState(false);
  const [showFormUser, setshowFormUser] = useState(false);

  const [formDataUser, setFormDataUser] = useState({
    name: '',
    surname: '',
    birth_date: '',
    address: '',
    email: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    director: '',
    running_time: '',
    description: '',
    short_description: '',
    cost: '',
    age_limit: '',
    release_date: '',
    trailer_url: '',
    movie_url: '',
    details_url: '',
  });

  const handleRowSelect = (row) => {
    setFormData(row);
    setshowForm(true);
    setSelectedID(row.id);
  };

  const handleRowSelectUser = (row) => {
    setFormDataUser(row);
    setshowFormUser(true);
    setSelectedUserID(row.id);
  };

  const handleUserUpdate = async () => {
    try {
      const updatedUser = await axios.put(
        `/api/v1/updateUser/${formDataUser.id}`,
        formDataUser
      );
      if (updatedUser.data.status !== 'success') {
        throw new Error(updatedUser.data.message);
      }

      getChangedRow(updatedUser.data.data[0]);
      setSuccessMessage('Pomyślnie zmieniono dane.');
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      clearAsyncMessages(setSuccessMessage, setErrMessage, null);
      setshowFormUser(false);
    }
  };

  const handleMovieUpdate = async () => {
    try {
      for (const el in formData) {
        if (formData[el] === '') {
          throw new Error('Uzupełnij dane!');
        }
      }

      let updatedMovie;
      if (!poster) {
        updatedMovie = await axios.put(
          `/api/v1/movies/${formData.id}`,
          formData
        );
      }

      if (poster) {
        const dataWithImg = new FormData();

        for (const el in formData) {
          dataWithImg.append(el, formData[el]);
        }
        dataWithImg.append('poster', poster);
        updatedMovie = await axios.post(
          `/api/v1/movies/withImg/${formData.id}`,
          dataWithImg
        );
      }

      if (updatedMovie.data.status !== 'success') {
        throw new Error(updatedMovie.data.message);
      }
      getChangedRow(updatedMovie.data.data[0]);
      setSuccessMessage('Pomyślnie zmieniono dane.');
    } catch (err) {
      setErrMessage(err.message);
    } finally {
      clearAsyncMessages(setSuccessMessage, setErrMessage, null);
      setshowForm(false);
    }
  };

  const handleFormDataChange = (e, movies = true) => {
    if (!movies) {
      setFormDataUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    if (movies) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <>
      {errMessage && <Alert>{errMessage}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}
      <TableContainer
        component={Paper}
        sx={{
          height: 600,
          width: '90vw',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <Table sx={{ overflow: 'scroll' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {headings.map((h, i) => (
                <StyledTableCell key={h + i} align="center">
                  {h}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataType === 'users'
              ? rows.map(
                  (row) =>
                    row.role !== 'administrator' && (
                      <StyledTableRow
                        onClick={() => handleRowSelectUser(row)}
                        selected={selectedUserID === row.id}
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.surname}</TableCell>
                        <TableCell align="center">{row.role}</TableCell>
                        <TableCell align="center">
                          {row.banned ? 'Tak' : 'Nie'}
                        </TableCell>
                        <TableCell align="center">
                          {row.muted ? 'Tak' : 'Nie'}
                        </TableCell>
                        <TableCell align="center">{row.address}</TableCell>
                        <TableCell align="center">{row.birth_date}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                      </StyledTableRow>
                    )
                )
              : rows.map((row) => (
                  <StyledTableRow
                    key={row.title}
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}
                    onClick={() => handleRowSelect(row)}
                    selected={selectedID === row.id}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.age_limit}</TableCell>
                    <TableCell align="center">
                      {row.short_description.slice(0, 15)}...
                    </TableCell>
                    <TableCell align="center">
                      {row.description.slice(0, 30)}...
                    </TableCell>
                    <TableCell align="center">{row.director}</TableCell>
                    <TableCell align="center">{row.release_date}</TableCell>
                    <TableCell align="center">{row.running_time}</TableCell>
                    <TableCell align="center">
                      {row.movie_url.slice(0, 18)}...
                    </TableCell>
                    <TableCell align="center">
                      {row.trailer_url.slice(0, 18)}...
                    </TableCell>
                    <TableCell align="center">
                      {row.details_url.slice(0, 18)}...
                    </TableCell>
                    <TableCell align="center">{row.rentals_number}</TableCell>
                    <TableCell align="center">{row.rating_quantity}</TableCell>
                    <TableCell align="center">{row.cost} zł</TableCell>
                    <TableCell align="center">
                      <img
                        style={{
                          width: '70px',
                          height: '35px',
                          objectFit: 'cover',
                        }}
                        src={`http://127.0.0.1:8000/images/movies/${row.poster}`}
                        alt="plakat"
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dataType === 'movies' && showForm && (
        <Form>
          <Typography sx={{ fontWeight: 700, fontSize: 24, my: 5 }}>
            Aktualizacja filmu
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
              <TextField
                variant="filled"
                sx={{ width: '90%' }}
                id="details_url"
                name="details_url"
                label="URL do detali"
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
                  onChange={(e) => setPoster(e.target.files[0])}
                />
              </div>
            </Grid>
          </Grid>
          <Button
            size="large"
            variant="contained"
            sx={{ marginTop: 8, marginBottom: 10 }}
            onClick={handleMovieUpdate}
          >
            Zapisz
          </Button>
        </Form>
      )}
      {dataType === 'users' && showFormUser && (
        <Form>
          <Typography sx={{ fontWeight: 700, fontSize: 24, my: 5 }}>
            Aktualizacja użytkownika
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
                id="name"
                name="name"
                label="Imię"
                onChange={(e) => handleFormDataChange(e, false)}
                value={formDataUser.name}
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
                sx={{ width: '90%', mx: 'auto' }}
                id="surname"
                name="surname"
                label="Nazwisko"
                onChange={(e) => handleFormDataChange(e, false)}
                value={formDataUser.surname}
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
                sx={{ width: '90%', mx: 'auto' }}
                id="address"
                name="address"
                label="Adres"
                onChange={(e) => handleFormDataChange(e, false)}
                value={formDataUser.address}
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
                sx={{ width: '90%', mx: 'auto' }}
                id="birth_date"
                name="birth_date"
                label="Data urodzenia"
                type="date"
                onChange={(e) => handleFormDataChange(e, false)}
                value={formDataUser.birth_date}
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
                sx={{ width: '90%', mx: 'auto' }}
                id="email"
                type="email"
                required
                name="email"
                label="Adres e-mail"
                onChange={(e) => handleFormDataChange(e, false)}
                value={formDataUser.email}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            variant="contained"
            sx={{ marginTop: 8, marginBottom: 10 }}
            onClick={handleUserUpdate}
          >
            Zapisz
          </Button>
        </Form>
      )}
    </>
  );
};

export default TableComponent;

const StyledTableRow = styled(TableRow)`
  && {
    cursor: pointer !important;

    &:hover {
      background-color: rgba(204, 237, 255, 0.2);
    }
  }
`;

const Form = styled.form`
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

TableComponent.propTypes = {
  rows: PropTypes.array,
  dataType: PropTypes.string,
  headings: PropTypes.array,
  getChangedRow: PropTypes.func,
};
