// src/components/CardNotesRulings.tsx

import React, { useEffect, useState } from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Ruling {
  source: string;
  published_at: string;
  comment: string;
}

interface CardNotesRulingsProps {
  cardId: string;
  oracle_text: string;
}

const CardNotesRulings: React.FC<CardNotesRulingsProps> = ({ cardId, oracle_text }) => {
  const [rulings, setRulings] = useState<Ruling[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRulings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.scryfall.com/cards/${cardId}/rulings`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch rulings.');
        }
        const data = await response.json();
        setRulings(data.data);
      } catch (err: any) {
        console.error('Error fetching rulings:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRulings();
  }, [cardId]);

  return (
    <div>
      {/* Oracle Text */}
      {oracle_text && (
        <Typography variant="body1" gutterBottom>
          {oracle_text}
        </Typography>
      )}

      {/* Rulings */}
      {loading ? (
        <Typography>Loading rulings...</Typography>
      ) : error ? (
        <Typography color="error">Error fetching rulings: {error}</Typography>
      ) : rulings.length > 0 ? (
        rulings.map((ruling, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{new Date(ruling.published_at).toLocaleDateString()}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{ruling.comment}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body2">No rulings available.</Typography>
      )}
    </div>
  );
};

export default CardNotesRulings;
