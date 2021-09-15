import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '@app/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Navbar from '@app/components/Layout/Navbar';

let persister = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Navbar className="h-14" />
        <div className="pt-14">
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
}
export default MyApp
