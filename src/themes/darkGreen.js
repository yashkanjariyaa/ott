import { createTheme } from '@mui/material/styles';

export const darkGreentheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#44d2a2',
    },
    secondary: {
      main: '#b6fda5',
    },
    background: {
      default: '#000000',
      paper: '#00100a',
    },
    text: {
      disabled: 'rgba(110,189,162,0.5)',
      secondary: 'rgba(182,236,229,0.7)',
    },
  },
  typography: {
    fontSize: 13,
    fontWeightLight: 200,
  },
});