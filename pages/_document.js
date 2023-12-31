import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
        <link
          rel="preload"
          href="fonts/OraqleScript.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Open+Sans:wght@300;500&display=swap" rel="stylesheet"></link>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://kit.fontawesome.com/66e49c80d0.js" crossOrigin="anonymous"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument;
