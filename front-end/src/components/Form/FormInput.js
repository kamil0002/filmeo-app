import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormControl, TextField } from '@mui/material';
import responsive from 'theme/responsive';

const FormInput = ({
  id,
  label,
  type,
  isValid,
  helperText,
  validator,
  ...props
}) => {
  return (
    <FormControl required={true} margin="normal">
      <StyledTextField
        {...props}
        error={isValid}
        {...validator}
        id={id}
        label={label}
        type={type}
        autoComplete="off"
        variant="standard"
        helperText={isValid ? helperText : ''}
      />
    </FormControl>
  );
};

export default FormInput;

const StyledTextField = styled(TextField)`
  @media ${responsive.tablet} {
    width: 350px;
  }
`;

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  validator: PropTypes.any,
  isValid: PropTypes.bool,
  helperText: PropTypes.string.isRequired,
};

FormInput.defaultProps = {
  type: 'text',
};
