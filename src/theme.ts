// src/theme.ts

import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Define forest green shade
const forestGreen = green[700]; // You can adjust the shade as needed

const theme = createTheme({
  palette: {
    primary: {
      main: forestGreen,
    },
    secondary: {
      main: green[500],
    },
    background: {
      default: green[50], // Light green background
      paper: '#ffffff', // White background for Paper components
    },
  },
  components: {
    // Customize MUI components here
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Rounded corners
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: forestGreen,
        },
        thumb: {
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(34, 139, 34, 0.16)',
          },
        },
      },
    },
    // Add more component customizations as needed
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    // Customize typography here
  },
});

export default theme;
