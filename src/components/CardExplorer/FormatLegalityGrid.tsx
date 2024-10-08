// src/components/FormatLegalityGrid.tsx

import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Legalities } from './Card';

interface FormatLegalityGridProps {
  legalities: Legalities;
}

const FormatLegalityGrid: React.FC<FormatLegalityGridProps> = ({ legalities }) => {
  return (
    <Grid container spacing={1}>
      {Object.entries(legalities).map(([format, status]) => (
        <Grid item xs={6} sm={4} key={format}>
          <Typography variant="body2">
            <strong>{format.charAt(0).toUpperCase() + format.slice(1)}:</strong>{' '}
            {status.replace('_', ' ')}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default FormatLegalityGrid;
