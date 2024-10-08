// src/components/CardExplorer/SearchForm.tsx

import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

interface SearchFormProps {
  query: string;
  setQuery: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, setQuery, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            fullWidth
            label="Search Cards"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: '56px' }} // Match TextField height
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchForm;
