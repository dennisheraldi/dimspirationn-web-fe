import Head from 'next/head';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface Link {
  name: string;
  link: string;
}

interface Props {
  children: React.ReactNode;
  title?: string;
  footerData?: {
    id: string;
    attributes: Link;
  }[];
}

export const pageAnimation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

export const Layout = ({ children, title, footerData }: Props) => {
  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Dimas Wisnu Prakoso` : 'Dimas Wisnu Prakoso'}
        </title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Box maxW="1680px" w="100%" m="auto">
        <Navbar />
        <motion.div
          variants={pageAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Box px={20} py={5}>
            {children}
          </Box>
        </motion.div>
        {footerData && <Footer footerData={footerData} />}
      </Box>
    </>
  );
};

export const IndexLayout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Dimas Wisnu Prakoso</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  );
};
