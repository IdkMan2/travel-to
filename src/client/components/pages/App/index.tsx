import darkTheme from '@client/assets/theme/dark';
import lightTheme from '@client/assets/theme/light';
import MainFrame from '@client/components/atoms/MainFrame';
import {AuthProvider} from '@client/contexts/AuthContext';
import IEnhancedAppProps from '@client/interfaces/IEnhancedAppProps';
import {ILayoutComponent} from '@client/interfaces/ILayout';
import {useMediaQuery} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import Head from 'next/head';
import React, {memo, ReactNode} from 'react';

const DefaultLayout: ILayoutComponent = ({children}: {children: ReactNode}) => <>{children}</>;

function App({Component: Page, pageProps}: IEnhancedAppProps<{children: ReactNode}>) {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const Layout: ILayoutComponent = Page.layout || DefaultLayout;

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
            <Layout>
              <Page {...pageProps} />
            </Layout>
          </MainFrame>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default memo(App);
