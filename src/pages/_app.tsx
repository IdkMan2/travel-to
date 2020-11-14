import '../assets/scss/global.scss';

import {useMediaQuery} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import {Provider as AuthProvider} from 'next-auth/client';
import {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';

import darkTheme from '../assets/theme/dark';
import lightTheme from '../assets/theme/light';
import MainFrame from '../components/atoms/MainFrame';

function App({Component: Page, pageProps}: AppProps) {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <>
      <Head>
        <title>Travel-To</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Śledź swoje postępy gdziekolwiek jesteś' />
      </Head>
      <CssBaseline />
      <AuthProvider session={pageProps.session}>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <MainFrame>
            <Page {...pageProps} />
          </MainFrame>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
