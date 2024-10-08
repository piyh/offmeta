// src/components/CardExplorer/CardGrid.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { Card as CardType } from './Card';
import CardItem from './CardItem';

interface CardGridProps {
  cards: CardType[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={6} sm={4} md={3} key={card.id}>
          <CardItem card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
