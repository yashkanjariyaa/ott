import { createTheme } from '@mui/material/styles';

export const themeOptions= createTheme( {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#69add8',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
  },
});