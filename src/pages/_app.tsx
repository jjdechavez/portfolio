import type { AppProps /*, AppContext */ } from 'next/app';
import { SWRConfig } from 'swr';
import fetchJson from '@/presentation/helpers/fetchJson';
import 'tailwindcss/tailwind.css';
import 'styles/globals.css';
import { Page } from '@/presentation/types/page';

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error('swrconfig Error:', err);
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
