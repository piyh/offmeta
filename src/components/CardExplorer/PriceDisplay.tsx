// src/components/CardExplorer/PriceDisplay.tsx

import React from 'react';
import { Typography, Grid, Chip } from '@mui/material';
import { Prices } from './Card';

interface PriceDisplayProps {
  prices: Prices;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ prices }) => {
  const { usd, usd_foil, eur, eur_foil, tix, usd_etched } = prices;

  const renderPrice = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <Grid item xs={6} sm={4}>
        <Typography variant="body2">
          <strong>{label}:</strong> ${parseFloat(value).toFixed(2)}
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid container spacing={1}>
      {renderPrice('USD', usd)}
      {renderPrice('USD Foil', usd_foil)}
      {renderPrice('EUR', eur)}
      {renderPrice('EUR Foil', eur_foil)}
      {renderPrice('TIX', tix)}
      {renderPrice('USD Etched', usd_etched)}
    </Grid>
  );
};

export default PriceDisplay;
