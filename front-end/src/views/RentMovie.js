/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import responsive from 'theme/responsive';

const steps = ['Informacje o zamówieniu', 'Dane kupującego', 'Potwierdzenie'];

const RentMovie = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setOrderCompleted(true);
  };

  return (
    <Wrapper>
      <StyledPaper>
        <Stepper
          style={{ padding: '24px 0px 24px 0px' }}
          activeStep={activeStep}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepButton className="blabla" onClick={handleStep(index)}>
                {label}
              </StyledStepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {orderCompleted ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Powrót
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  onClick={
                    activeStep === steps.length - 1
                      ? handleComplete
                      : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? 'Zamów' : 'Dalej'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </div>
      </StyledPaper>
    </Wrapper>
  );
};

export default RentMovie;

const Wrapper = styled(Box)`
  min-height: calc(100vh - 76px - 70px);
  max-width: 1200px;
  margin: 5rem auto;
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 1rem 2rem;
    @media ${responsive.laptop} {
      padding: 2.5rem 5rem;
    }
  }
`;

const StyledStepButton = styled(StepButton)`
  && {
    span {
      :last-child {
        span:last-of-type {
          display: none;

          @media ${responsive.tablet} {
            display: block;
          }
        }
      }
    }
  }
`;
