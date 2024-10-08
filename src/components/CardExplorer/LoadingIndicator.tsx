// src/components/CardExplorer/LoadingIndicator.tsx

import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingIndicator: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" marginTop="20px">
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
