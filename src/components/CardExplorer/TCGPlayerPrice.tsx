// src/components/TCGPlayerPrice.tsx

import React, { useEffect, useState } from 'react';
import { Typography, Link } from '@mui/material';

interface TCGPlayerPriceProps {
  cardId: string;
}

interface PriceData {
  usd?: string;
  usd_foil?: string;
}

const TCGPlayerPrice: React.FC<TCGPlayerPriceProps> = ({ cardId }) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [tcgplayerUrl, setTcgplayerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch card price.');
        }
        const data = await response.json();
        const prices = data.prices as PriceData;
        const tcgUrl = data.purchase_uris?.tcgplayer;

        setPriceData(prices);
        setTcgplayerUrl(tcgUrl || null);
      } catch (err: any) {
        console.error('Error fetching card price:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [cardId]);

  if (loading) {
    return <Typography>Loading price...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error fetching price: {error}</Typography>;
  }

  if (!priceData || (!priceData.usd && !priceData.usd_foil)) {
    return <Typography>No price data available.</Typography>;
  }

  return (
    <div>
      {priceData.usd && (
        <Typography variant="body1">
          <strong>Non-Foil Price:</strong> ${priceData.usd}
        </Typography>
      )}
      {priceData.usd_foil && (
        <Typography variant="body1">
          <strong>Foil Price:</strong> ${priceData.usd_foil}
        </Typography>
      )}
      {tcgplayerUrl && (
        <Typography variant="body1">
          <Link href={tcgplayerUrl} target="_blank" rel="noopener noreferrer">
            Purchase on TCGPlayer
          </Link>
        </Typography>
      )}
    </div>
  );
};

export default TCGPlayerPrice;
