import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';

const Form = ({ submitFn, children, buttonText }) => {
  return (
    <StyledForm onSubmit={submitFn}>
      {children}
      <Button
        type="submit"
        sx={{ alignSelf: 'baseline', marginTop: 3, fontFamily: 'Poppins' }}
        variant="contained"
      >
        {buttonText}
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default Form;

Form.propTypes = {
  submitFn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
};
