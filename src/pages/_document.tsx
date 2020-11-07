import {ServerStyleSheets} from '@material-ui/styles';
import {AppType} from 'next/dist/next-server/lib/utils';
import Document, {DocumentContext, Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: AppType) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    // noinspection HtmlRequiredTitleElement
    return (
      <Html lang={'pl'}>
        <Head>
          <meta name='msapplication-config' content='/windows-tiles.xml' />
          <meta name='application-name' content='Travel-To' />
          <meta name='theme-color' content='#3F51B5' />

          <link
            rel='apple-touch-icon-precomposed'
            sizes='57x57'
            href='/meta/apple-touch-icons/apple-touch-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='114x114'
            href='/meta/apple-touch-icons/apple-touch-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='72x72'
            href='/meta/apple-touch-icons/apple-touch-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='144x144'
            href='/meta/apple-touch-icons/apple-touch-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='60x60'
            href='/meta/apple-touch-icons/apple-touch-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='120x120'
            href='/meta/apple-touch-icons/apple-touch-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='76x76'
            href='/meta/apple-touch-icons/apple-touch-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='152x152'
            href='/meta/apple-touch-icons/apple-touch-icon-152x152.png'
          />

          <link rel='icon' href='/favicon.ico' />
          <link rel='manifest' href='/manifest.json' />

          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Anton&display=swap' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// Resolution order
//
// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render
//
// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render
//
// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render
