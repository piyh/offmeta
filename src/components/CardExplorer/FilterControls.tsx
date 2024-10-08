// src/components/CardExplorer/FilterControls.tsx

import React from 'react';
import {
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  SelectChangeEvent,
} from '@mui/material';

interface FilterControlsProps {
  edhrecPercentile: number;
  setEdhrecPercentile: (value: number) => void;
  type: string;
  setType: (value: string) => void;
  subtypes: string;
  setSubtypes: (value: string) => void;
  subtypeLogic: 'and' | 'or';
  setSubtypeLogic: (value: 'and' | 'or') => void;
  colors: string[];
  setColors: (value: string[]) => void;
  colorFilterMode: 'colors' | 'identity';
  setColorFilterMode: (value: 'colors' | 'identity') => void;
  rarity: string;
  setRarity: (value: string) => void;
  manaValue: string;
  setManaValue: (value: string) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  format: string;
  setFormat: (value: string) => void;
  availability: string[];
  setAvailability: (value: string[]) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  edhrecPercentile,
  setEdhrecPercentile,
  type,
  setType,
  subtypes,
  setSubtypes,
  subtypeLogic,
  setSubtypeLogic,
  colors,
  setColors,
  colorFilterMode,
  setColorFilterMode,
  rarity,
  setRarity,
  manaValue,
  setManaValue,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  format,
  setFormat,
  availability,
  setAvailability,
}) => {
  // Color mapping for WUBRG
  const colorMap: { [key: string]: string } = {
    W: '#EDE0C8', // Light beige for White
    U: '#1E90FF', // Blue
    B: '#A9A9A9', // Dark gray for Black
    R: '#FF6347', // Tomato Red
    G: '#32CD32', // Lime Green
  };

  return (
    <Grid container spacing={2}>
      {/* EDHREC Percentile Slider */}
      <Grid item xs={12}>
        <Typography gutterBottom>
          EDHREC Percentile: {edhrecPercentile}%
        </Typography>
        <Slider
          value={edhrecPercentile}
          onChange={(e, newValue) => setEdhrecPercentile(newValue as number)}
          aria-labelledby="edhrec-percentile-slider"
          valueLabelDisplay="auto"
          min={1}
          max={100}
        />
        <Typography variant="caption">
          100% (Most Popular) to 1% (Least Popular)
        </Typography>
      </Grid>

      {/* Type Filter */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={type}
            onChange={(e: SelectChangeEvent<string>) => setType(e.target.value)}
            label="Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {/* Example Options */}
            <MenuItem value="Creature">Creature</MenuItem>
            <MenuItem value="Artifact">Artifact</MenuItem>
            <MenuItem value="Enchantment">Enchantment</MenuItem>
            <MenuItem value="Instant">Instant</MenuItem>
            <MenuItem value="Sorcery">Sorcery</MenuItem>
            {/* Add more types as needed */}
          </Select>
        </FormControl>
      </Grid>

      {/* Subtype Filter */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Subtypes"
          placeholder="e.g., Elf, Warrior"
          value={subtypes}
          onChange={(e) => setSubtypes(e.target.value)}
        />
      </Grid>

      {/* Subtype Logic */}
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Subtype Match Logic</FormLabel>
          <RadioGroup
            row
            aria-label="subtype logic"
            name="subtype-logic"
            value={subtypeLogic}
            onChange={(e) => setSubtypeLogic(e.target.value as 'and' | 'or')}
          >
            <FormControlLabel value="and" control={<Radio />} label="Match All (AND)" />
            <FormControlLabel value="or" control={<Radio />} label="Match Any (OR)" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Rarity Filter */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="rarity-select-label">Rarity</InputLabel>
          <Select
            labelId="rarity-select-label"
            id="rarity-select"
            value={rarity}
            onChange={(e: SelectChangeEvent<string>) => setRarity(e.target.value)}
            label="Rarity"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="uncommon">Uncommon</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="mythic">Mythic</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Mana Value Filter */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Mana Value"
          placeholder="e.g., 3, <=2, >=5"
          value={manaValue}
          onChange={(e) => setManaValue(e.target.value)}
        />
      </Grid>

      {/* Color Filter Mode */}
      <Grid item xs={12}>
        <ToggleButtonGroup
          value={colorFilterMode}
          exclusive
          onChange={(e, newMode) => {
            if (newMode !== null) setColorFilterMode(newMode);
          }}
          aria-label="color filter mode"
        >
          <ToggleButton value="colors" aria-label="colors">
            Card Colors
          </ToggleButton>
          <ToggleButton value="identity" aria-label="identity">
            Commander Identity
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      {/* Color Filter */}
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Colors:
        </Typography>
        <ToggleButtonGroup
          value={colors}
          onChange={(e, newColors) => {
            if (newColors !== null) setColors(newColors);
          }}
          aria-label="colors"
        >
          {['W', 'U', 'B', 'R', 'G'].map((color) => (
            <ToggleButton
              key={color}
              value={color}
              aria-label={color}
              style={{
                backgroundColor: colors.includes(color) ? colorMap[color] : '#f0f0f0',
                color: colors.includes(color) ? '#FFF' : '#000',
              }}
            >
              {color}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>

      {/* Price Filters */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Price Minimum (USD)"
          placeholder="e.g., 0.50"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Price Maximum (USD)"
          placeholder="e.g., 10.00"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
        />
      </Grid>

      {/* Format Legality */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="format-select-label">Format Legality</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            value={format}
            onChange={(e: SelectChangeEvent<string>) => setFormat(e.target.value)}
            label="Format Legality"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="commander">Commander</MenuItem>
            <MenuItem value="legacy">Legacy</MenuItem>
            <MenuItem value="modern">Modern</MenuItem>
            <MenuItem value="standard">Standard</MenuItem>
            {/* Add more formats as needed */}
          </Select>
        </FormControl>
      </Grid>

      {/* Availability Filters */}
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" gutterBottom>
          Availability:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={availability.includes('paper')}
              onChange={(e) => {
                const newAvailability = e.target.checked
                  ? [...availability, 'paper']
                  : availability.filter((a) => a !== 'paper');
                setAvailability(newAvailability);
              }}
            />
          }
          label="Paper"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={availability.includes('mtgo')}
              onChange={(e) => {
                const newAvailability = e.target.checked
                  ? [...availability, 'mtgo']
                  : availability.filter((a) => a !== 'mtgo');
                setAvailability(newAvailability);
              }}
            />
          }
          label="MTGO"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={availability.includes('arena')}
              onChange={(e) => {
                const newAvailability = e.target.checked
                  ? [...availability, 'arena']
                  : availability.filter((a) => a !== 'arena');
                setAvailability(newAvailability);
              }}
            />
          }
          label="Arena"
        />
      </Grid>
    </Grid>
  );
};

export default FilterControls;
