import theme from '@/styles/theme';
import { Center, ChakraProvider, Spinner } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { useState } from 'react';
import Router from 'next/router';
import { Layout } from '@/components/Layout';
import { AnimatePresence } from 'framer-motion';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function App({ Component, pageProps, router }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));

  return (
    <main className={roboto.className}>
      <ChakraProvider theme={theme}>
        {loading ? (
          <Layout>
            <Center pt={4}>
              <Spinner size="lg" speed="0.7s" />
            </Center>
          </Layout>
        ) : (
          // bugged, no solution as of now (gegara next 13 dari yg dibaca)
          // exit animation not triggered
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        )}
      </ChakraProvider>
    </main>
  );
}
