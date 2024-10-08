// src/components/CardExplorer/RulingsList.tsx

import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Ruling } from './Card';

interface RulingsListProps {
  rulings: Ruling[];
}

const RulingsList: React.FC<RulingsListProps> = ({ rulings }) => {
  return (
    <List>
      {rulings.map((ruling, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemText
            primary={
              <Typography variant="body2" color="textSecondary">
                {new Date(ruling.published_at).toLocaleDateString()}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="textPrimary">
                {ruling.comment}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RulingsList;
