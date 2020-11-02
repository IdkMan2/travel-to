import '../assets/scss/global.scss';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Router from './Router';
import {useMediaQuery} from '@material-ui/core';
import darkTheme from '../assets/theme/dark';
import lightTheme from '../assets/theme/light';
import MainFrame from '../components/atoms/MainFrame';

function App() {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <MainFrame>
          <Router />
        </MainFrame>
      </ThemeProvider>
    </>
  );
}

export default App;
