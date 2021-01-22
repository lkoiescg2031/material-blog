import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f2aeae',
      main: '#ef9a9a',
      dark: '#a76b6b',
      contrastText: '#fff',
    },
    secondary: indigo,
  },
});

export default theme;
