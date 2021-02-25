import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f2aeae',
      main: '#ef9a9a',
      dark: '#a76b6b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#51b7ae',
      main: '#26a69a',
      dark: '#1a746b',
      contrastText: '#fff',
    },
  },
});

export default theme;
