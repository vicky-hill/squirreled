import '@/sass/main.scss'
import { ItemContextProvider } from '@/context/ItemContext'
import { LocationContextProvider } from '@/context/LocationContext'
import { UserContextProvider } from '@/context/UserContext'

function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <LocationContextProvider>
        <ItemContextProvider>
          <Component {...pageProps} />
        </ItemContextProvider>
      </LocationContextProvider>
      </UserContextProvider>
      )
}

      export default App;
