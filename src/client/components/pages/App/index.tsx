import darkTheme from '@client/assets/theme/dark';
import lightTheme from '@client/assets/theme/light';
import MainFrame from '@client/components/atoms/MainFrame';
import {AuthProvider} from '@client/contexts/AuthContext';
import {useMediaQuery} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import {AppProps} from 'next/app';
import Head from 'next/head';
import React, {memo} from 'react';

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
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <AuthProvider>
          <MainFrame>
            <Page {...pageProps} />
          </MainFrame>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default memo(App);
