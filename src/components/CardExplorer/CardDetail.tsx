// src/components/CardDetail.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Paper,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import FormatLegalityGrid from './FormatLegalityGrid';
import CardNotesRulings from './CardNotesRulings';
import TCGPlayerPrice from './TCGPlayerPrice';
import { Card as CardType } from './Card';

const CardDetail: React.FC = () => {
  const { cardId } = useParams<{ cardId: string }>();

  const [card, setCard] = useState<CardType | null>(null);
  const [relatedCards, setRelatedCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cardId) {
      setError('Card ID not found in URL.');
      setLoading(false);
      return;
    }

    const fetchCard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.scryfall.com/cards/${cardId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to fetch card details.');
        }
        const data: CardType = await response.json();
        setCard(data);
      } catch (err: any) {
        console.error('Error fetching card:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [cardId]);

  useEffect(() => {
    if (card && card.type_line) {
      // Fetch related cards based on the card's type
      const fetchRelatedCards = async () => {
        try {
          const typeQuery = card.type_line?.split(' — ')[0].replace(/ /g, '+');
          const response = await fetch(
            `https://api.scryfall.com/cards/search?q=type%3A${typeQuery}&order=edhrec&page=1`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.details || 'Failed to fetch related cards.');
          }
          const data = await response.json();
          setRelatedCards(data.data);
        } catch (err: any) {
          console.error('Error fetching related cards:', err.message);
        }
      };

      fetchRelatedCards();
    }
  }, [card]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" marginTop="50px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" marginTop="50px">
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!card) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Grid container spacing={4}>
          {/* Card Image */}
          <Grid item xs={12} sm={4}>
            {card.image_uris ? (
              <Card>
                <CardMedia component="img" image={card.image_uris.normal} alt={card.name} />
              </Card>
            ) : (
              <Box
                height="300px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#f0f0f0"
              >
                <Typography variant="h6">{card.name}</Typography>
              </Box>
            )}
          </Grid>

          {/* Card Details */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {card.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {card.type_line}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {card.oracle_text}
            </Typography>

            {/* Format Legality */}
            {card.legalities && (
              <Box marginTop="20px">
                <Typography variant="h6">Format Legality</Typography>
                <FormatLegalityGrid legalities={card.legalities} />
              </Box>
            )}

            {/* Notes and Rulings */}
            <Box marginTop="20px">
              <Typography variant="h6">Notes and Rulings</Typography>
              <CardNotesRulings cardId={cardId!} oracle_text={card.oracle_text || ''} />
            </Box>

            {/* TCGPlayer Price */}
            <Box marginTop="20px">
              <Typography variant="h6">TCGPlayer Price</Typography>
              <TCGPlayerPrice cardId={card.id} />
            </Box>
          </Grid>

          {/* Related Cards */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Related Cards
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              {relatedCards.length > 0 ? (
                relatedCards.map((relatedCard) => (
                  <Grid item xs={12} sm={6} md={4} key={relatedCard.id}>
                    <Card>
                      {relatedCard.image_uris && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={relatedCard.image_uris.normal}
                          alt={relatedCard.name}
                        />
                      )}
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {relatedCard.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {relatedCard.type_line}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography>No related cards found.</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CardDetail;
