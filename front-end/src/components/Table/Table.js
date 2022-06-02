import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableComponent = ({ rows, dataType, headings }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 600,
        width: '90vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
      }}
    >
      <Table
        sx={{ overflow: 'scroll', height: 600 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {headings.map((h, i) => (
              <TableCell key={h + i} align="center">
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataType === 'users'
            ? rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
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
                </TableRow>
              ))
            : rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  rows: PropTypes.array,
  dataType: PropTypes.string,
  headings: PropTypes.array,
};
