import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../assets/theme/light';
import Router from './Router';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
