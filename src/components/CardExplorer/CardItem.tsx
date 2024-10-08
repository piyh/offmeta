// src/components/CardExplorer/CardItem.tsx

import React from 'react';
import { Card, CardMedia, CardActionArea, Typography } from '@mui/material';
import { Card as CardType } from './Card';
import { Link } from 'react-router-dom';

interface CardItemProps {
  card: CardType;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/card/${card.id}`}>
        {card.image_uris ? (
          <CardMedia
            component="img"
            image={card.image_uris.normal}
            alt={card.name}
          />
        ) : (
          <div style={{ height: '340px', backgroundColor: '#eee', position: 'relative' }}>
            <Typography
              align="center"
              variant="subtitle1"
              style={{ paddingTop: '150px' }}
            >
              {card.name}
            </Typography>
          </div>
        )}
        {/* Display EDHREC Rank */}
        {card.edhrec_rank !== undefined && (
          <Typography
            variant="caption"
            color="textSecondary"
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              padding: '2px 4px',
              borderRadius: '4px',
            }}
          >
            EDHREC Rank: {card.edhrec_rank}
          </Typography>
        )}
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
