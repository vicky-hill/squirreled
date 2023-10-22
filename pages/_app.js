import '@/sass/main.scss'
import { ItemContextProvider } from '@/context/ItemContext';
import { LocationContextProvider } from '@/context/LocationContext';

function App({ Component, pageProps }) {
  return (
    <LocationContextProvider>
      <ItemContextProvider>
        <Component {...pageProps} />
      </ItemContextProvider>
    </LocationContextProvider>
  )
}

export default App;
