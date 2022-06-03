/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import Typography from 'components/Typography/Typography';
import responsive from 'theme/responsive';

const AddMovie = ({ setFormInvisible }) => {
  const [processing, setProcessing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: false,
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <Close onClick={setFormInvisible} />
      <Heading
        fontFamily="Poppins"
        textTransform={'uppercase'}
        fontWeight={700}
      >
        Dodawanie filmu
      </Heading>
      <Form
        submitFn={handleSubmit(onSubmit)}
        buttonText="Dodaj film"
        processing={processing}
      >
        <FormInput
          validator={{
            ...register('title', {
              required: true,
            }),
          }}
          id="title"
          label="Tytuł"
          type="title"
          isValid={errors.title ? true : false}
          helperText="Niepoprawny tytuł"
        />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 76px);
  background: ${({ theme }) => theme.secondaryLight};
  position: fixed;
  z-index: 100;
`;

const Heading = styled(Typography)`
  && {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: ${({ theme }) => theme.fontBold};

    @media ${responsive.tablet} {
      font-size: ${({ theme }) => theme.fontSize.m};
    }

    @media ${responsive.desktop} {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }
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

AddMovie.propTypes = {
  setFormInvisible: PropTypes.func,
};
