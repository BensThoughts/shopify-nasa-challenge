import '@app/styles/globals.css';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {DefaultSeo} from 'next-seo';
import {store} from '@app/store/store';
const persister = persistStore(store);

import NextSeoConfig from '@app/next-seo.config';
import Navbar from '@app/components/Layout/Navbar';

import * as Fathom from 'fathom-client';
import {useRouter} from 'next/router';
import {useEffect} from 'react';


function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    Fathom.load('OVSLIPUZ', {
      url: 'https://descriptive-welcome.bensthoughts.dev/script.js',
      includedDomains: ['shopify-nasa-challenge.netlify.app'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DefaultSeo {...NextSeoConfig} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Navbar className="h-14" />
          <div className="pt-14">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;
