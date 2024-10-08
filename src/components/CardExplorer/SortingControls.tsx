// src/components/CardExplorer/SortingControls.tsx

import React from 'react';
import { Grid, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';

interface SortingControlsProps {
  sortOption: string;
  setSortOption: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
}

const SortingControls: React.FC<SortingControlsProps> = ({
  sortOption,
  setSortOption,
  sortOrder,
  setSortOrder,
}) => {
  // Define default sort orders for each sort option
  const defaultSortOrders: { [key: string]: 'asc' | 'desc' } = {
    edhrec: 'asc',       // Lower EDHREC rank (more popular) first
    name: 'asc',         // A to Z
    released: 'desc',    // Newest to oldest
    usd: 'asc',          // Lowest price first
    cmc: 'asc',          // Lowest mana value first
    power: 'desc',       // Highest power first
    toughness: 'desc',   // Highest toughness first
    // Add more sort options and their defaults as needed
  };

  // Handle changes to the sort option
  const handleSortOptionChange = (event: SelectChangeEvent<string>) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);

    // Set sort order to default based on the new sort option
    const defaultOrder = defaultSortOrders[newSortOption] || 'asc';
    setSortOrder(defaultOrder);
  };

  // Handle changes to the sort order
  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Sort By Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortOption}
            onChange={handleSortOptionChange}
            label="Sort By"
          >
            <MenuItem value="edhrec">EDHREC Rank</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="released">Release Date</MenuItem>
            <MenuItem value="usd">Price (USD)</MenuItem>
            <MenuItem value="cmc">Mana Value</MenuItem>
            <MenuItem value="power">Power</MenuItem>
            <MenuItem value="toughness">Toughness</MenuItem>
            {/* Add more sort options as needed */}
          </Select>
        </FormControl>
      </Grid>

      {/* Sort Order Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="order-select-label">Order</InputLabel>
          <Select
            labelId="order-select-label"
            id="order-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SortingControls;
