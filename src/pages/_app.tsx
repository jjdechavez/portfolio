import type { AppProps /*, AppContext */ } from 'next/app';
import { SWRConfig } from 'swr';
import fetchJson from '@/presentation/helpers/fetchJson';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error('swrconfig Error:', err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
