// src/components/CardExplorer/ErrorMessage.tsx

import React from 'react';
import { Typography, Box } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box textAlign="center" marginTop="20px">
      <Typography color="error" variant="body1">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
