// src/components/CardExplorer/CardExplorer.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Card as CardType } from './Card'; // Ensure this import path is correct
import {
  Container,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import SearchForm from './SearchForm';
import FilterControls from './FilterControls';
import SortingControls from './SortingControls';
import CardGrid from './CardGrid';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import debounce from 'lodash.debounce';

const CardExplorer: React.FC = () => {
  // State variables
  const [cards, setCards] = useState<CardType[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [subtypes, setSubtypes] = useState<string>('');
  const [subtypeLogic, setSubtypeLogic] = useState<'and' | 'or'>('or');
  const [colors, setColors] = useState<string[]>([]);
  const [colorFilterMode, setColorFilterMode] = useState<'colors' | 'identity'>('colors');
  const [rarity, setRarity] = useState<string>('');
  const [manaValue, setManaValue] = useState<string>('');
  const [edhrecPercentile, setEdhrecPercentile] = useState<number>(60); // Default to 60%
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [availability, setAvailability] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('edhrec'); // Default to 'edhrec'
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(getDefaultSortOrder('edhrec'));
  const [error, setError] = useState<string | null>(null);

  const maxEdhrecRank = 26923; // Maximum EDHREC rank

  // Function to get default sort order based on sort option
  function getDefaultSortOrder(option: string): 'asc' | 'desc' {
    switch (option) {
      case 'name':
        return 'asc';
      case 'released':
        return 'desc';
      case 'edhrec':
        return 'asc'; // Lower EDHREC rank means more popular
      case 'usd':
        return 'asc'; // Lower price first
      case 'cmc':
        return 'asc'; // Lower mana cost first
      case 'power':
        return 'desc'; // Higher power first
      case 'toughness':
        return 'desc'; // Higher toughness first
      default:
        return 'asc';
    }
  }

  // Debounced fetchCards to prevent excessive API calls
  const debouncedFetchCards = useCallback(
    debounce(() => {
      fetchCards();
    }, 500), // 500ms delay
    [
      query,
      type,
      subtypes,
      subtypeLogic,
      colors,
      colorFilterMode,
      rarity,
      manaValue,
      priceMin,
      priceMax,
      format,
      availability,
      sortOption,
      sortOrder,
    ]
  );

  // Fetch cards from Scryfall API
  const fetchCards = async () => {
    setLoading(true);
    setError(null);
    try {
      let fullQuery = '';

      // Build the query based on user inputs
      if (query) {
        fullQuery += ` (name:"${query}" or oracle:"${query}")`;
      }

      if (type) {
        fullQuery += ` type:"${type}"`;
      }

      if (subtypes) {
        const subtypeList = subtypes.split(',').map((s) => s.trim());
        if (subtypeList.length > 0) {
          const subtypeQuery = subtypeList
            .map((subtype) => ` t:"${subtype}"`)
            .join(subtypeLogic === 'and' ? ' ' : ' or');
          fullQuery += ` (${subtypeQuery})`;
        }
      }

      if (rarity) {
        fullQuery += ` rarity:${rarity}`;
      }

      if (manaValue) {
        fullQuery += ` mv:${manaValue}`;
      }

      if (colors.length > 0) {
        const colorQuery = colors.join('');
        if (colorFilterMode === 'colors') {
          fullQuery += ` c>=${colorQuery}`;
        } else if (colorFilterMode === 'identity') {
          fullQuery += ` id>=${colorQuery}`;
        }
      }

      // Exclude EDHREC percentile from API query; we'll handle it client-side

      if (priceMin) {
        fullQuery += ` usd>=${priceMin}`;
      }

      if (priceMax) {
        fullQuery += ` usd<=${priceMax}`;
      }

      if (format) {
        fullQuery += ` legal:${format}`;
      }

      if (availability.length > 0) {
        availability.forEach((option) => {
          fullQuery += ` game:${option}`;
        });
      }

      // Sorting options
      if (sortOption && sortOption !== 'edhrec') {
        fullQuery += ` order:${sortOption}`;
        if (sortOrder) {
          fullQuery += ` dir:${sortOrder}`;
        }
      }
      // For 'edhrec' sorting, we'll handle it client-side

      // Encode the query
      fullQuery = fullQuery.trim();
      const encodedQuery = encodeURIComponent(fullQuery);

      // Handle pagination: fetch up to a maximum number of pages
      let allCards: CardType[] = [];
      let hasMore = true;
      let page = 1;
      const maxPages = 5; // Adjust as needed based on performance

      while (hasMore && page <= maxPages) {
        const response = await fetch(
          `https://api.scryfall.com/cards/search?q=${encodedQuery}&page=${page}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Unknown error occurred');
        }
        const data = await response.json();

        allCards = allCards.concat(data.data);

        if (data.has_more && page < maxPages) {
          page += 1;
        } else {
          hasMore = false;
        }
      }

      setCards(allCards);
    } catch (err: any) {
      console.error('Error fetching data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission using debouncedFetchCards
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedFetchCards();
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetchCards.cancel();
    };
  }, [debouncedFetchCards]);

  // Filter cards based on EDHREC percentile and sort options
  useEffect(() => {
    if (cards.length > 0) {
      // Sort ascendingly by edhrec_rank (most powerful first)
      const sortedByRank = [...cards].sort(
        (a, b) => (a.edhrec_rank ?? maxEdhrecRank) - (b.edhrec_rank ?? maxEdhrecRank)
      );

      // Calculate number of cards to exclude based on percentile
      const numberToExclude = Math.floor(((100 - edhrecPercentile) / 100) * sortedByRank.length);

      // Ensure at least one card is included if percentile > 0
      const adjustedNumberToExclude = edhrecPercentile === 0 ? sortedByRank.length : numberToExclude;

      // Slice to include cards from numberToExclude to end
      const sliced = sortedByRank.slice(adjustedNumberToExclude);

      // Apply sorting based on sortOption
      let sortedCards = [...sliced];
      if (sortOption === 'edhrec') {
        sortedCards.sort((a, b) => {
          const rankA = a.edhrec_rank ?? Number.MAX_SAFE_INTEGER;
          const rankB = b.edhrec_rank ?? Number.MAX_SAFE_INTEGER;
          if (rankA < rankB) return sortOrder === 'asc' ? -1 : 1;
          if (rankA > rankB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      } else if (sortOption === 'name') {
        sortedCards.sort((a, b) => {
          if (a.name < b.name) return sortOrder === 'asc' ? -1 : 1;
          if (a.name > b.name) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      } else if (sortOption === 'released') {
        sortedCards.sort((a, b) => {
          const dateA = a.released_at
            ? new Date(a.released_at).getTime()
            : sortOrder === 'asc'
            ? Number.MAX_SAFE_INTEGER
            : Number.MIN_SAFE_INTEGER;
          const dateB = b.released_at
            ? new Date(b.released_at).getTime()
            : sortOrder === 'asc'
            ? Number.MAX_SAFE_INTEGER
            : Number.MIN_SAFE_INTEGER;
          if (dateA < dateB) return sortOrder === 'asc' ? -1 : 1;
          if (dateA > dateB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }
      // Add more sort options if necessary

      setFilteredCards(sortedCards);
    } else {
      setFilteredCards([]);
    }
  }, [cards, edhrecPercentile, sortOption, sortOrder]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom color="primary">
            Off-Meta
          </Typography>

          {/* Search Form */}
          <Box my={3}>
            <SearchForm query={query} setQuery={setQuery} handleSearch={handleSearch} />
          </Box>

          {/* Filter Controls */}
          <Box my={3}>
            <FilterControls
              edhrecPercentile={edhrecPercentile}
              setEdhrecPercentile={setEdhrecPercentile}
              type={type}
              setType={setType}
              subtypes={subtypes}
              setSubtypes={setSubtypes}
              subtypeLogic={subtypeLogic}
              setSubtypeLogic={setSubtypeLogic}
              colors={colors}
              setColors={setColors}
              colorFilterMode={colorFilterMode}
              setColorFilterMode={setColorFilterMode}
              rarity={rarity}
              setRarity={setRarity}
              manaValue={manaValue}
              setManaValue={setManaValue}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              format={format}
              setFormat={setFormat}
              availability={availability}
              setAvailability={setAvailability}
            />
          </Box>

          {/* Sorting Controls */}
          <Box my={3}>
            <SortingControls
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </Box>

          {/* Error Message */}
          {error && (
            <Box my={3}>
              <ErrorMessage message={error} />
            </Box>
          )}

          {/* Loading Indicator and Card Grid */}
          <Box my={3}>
            {loading ? (
              <LoadingIndicator />
            ) : filteredCards.length > 0 ? (
              <CardGrid cards={filteredCards} />
            ) : (
              <Typography variant="h6" align="center" color="textSecondary">
                No cards found with the selected filters.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CardExplorer;
