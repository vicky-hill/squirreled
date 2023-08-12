import '@/sass/main.scss'
import { ItemContextProvider } from '@/context/ItemContext';

function App({ Component, pageProps }) {
  return (
    <ItemContextProvider>
      <Component {...pageProps} />
    </ItemContextProvider>
  )
}

export default App;
