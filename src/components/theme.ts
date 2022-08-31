import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  shadows: [
    'none',
    '0px 0px 1px 3px rgb(0 0 0 / 2%)',
  ]
});

export default theme;
