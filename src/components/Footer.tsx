// src/components/Footer.tsx

import React from 'react';
import { Typography, Link, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer style={{ marginTop: '40px', padding: '20px 0', backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          Card data sourced from{' '}
          <Link href="https://scryfall.com/" target="_blank" rel="noopener noreferrer">
            Scryfall
          </Link>
          .
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Prices and availability from{' '}
          <Link href="https://www.tcgplayer.com/" target="_blank" rel="noopener noreferrer">
            TCGplayer
          </Link>
          .
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Off-Meta. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
