import { CircularProgress } from '@mui/material';
import React from 'react';

const ProcessingSpinner = () => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: '#ECEFF1',
        animationDuration: '550ms',
        marginLeft: 1,
      }}
      size={17}
      thickness={4}
    />
  );
};

export default ProcessingSpinner;
