import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const darkTheme = createMuiTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#DCEDC8',
      main: '#8BC34A',
      dark: '#689F38',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#C8E6C9',
      main: '#4CAF50',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#fff'
    },
    background: {
      default: '#303030'
    }
  },
});

export default darkTheme;
