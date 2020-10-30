import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#DCEDC8',
      main: '#8BC34A',
      dark: '#689F38',
      contrastText: '#212121'
    },
    secondary: {
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
  },
  typography: {

  }
});

export default lightTheme;
