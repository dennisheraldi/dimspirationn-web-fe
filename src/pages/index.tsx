/* eslint-disable react-hooks/exhaustive-deps */
import { Footer } from '@/components/Footer';
import { IndexLayout, pageAnimation } from '@/components/Layout';
import { Navbar } from '@/components/Navbar';
import { WorkGrid } from '@/components/Work';
import { getData } from '@/util/api';
import { VStack, Image, Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home({
  footerData,
  workData,
  bannerData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <IndexLayout>
      <VStack spacing={5} alignItems="flex-start" position="relative">
        <Flex
          position="absolute"
          top="0"
          left="0"
          w="100%"
          bg="#FFFFFFBB"
          zIndex={4}
        >
          <Box maxW="1680px" w="100%" m="auto">
            <Navbar color="black" />
          </Box>
        </Flex>
        <Link
          href={`/work/${bannerData[bannerIdx]?.slug}`}
          style={{ width: '100%' }}
        >
          <motion.div
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 5,
              times: [0, 0.05, 0.95, 1],
              ease: 'easeInOut'
            }}
            key={bannerData[bannerIdx]?.id}
          >
            <Image
              src={process.env.API_URL + bannerData[bannerIdx]?.url}
              alt=""
              objectFit="cover"
              w="100%"
              h="100vh"
              draggable={false}
            />
          </motion.div>
        </Link>
        <Box maxW="1680px" w="100%" m="auto">
          <motion.div
            variants={pageAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.3 }}
          >
            <Box px={20} py={5}>
              <WorkGrid workData={workData} />
            </Box>
          </motion.div>
          {footerData && <Footer footerData={footerData} />}
        </Box>
      </VStack>
    </IndexLayout>
  );
}

export const getServerSideProps = async () => {
  const { data: footerData } = await getData('/api/links');
  const { data: workDataRaw } = await getData(
    '/api/works?fields[0]=title&fields[1]=order&fields[2]=slug&sort[0]=order:asc&populate[portrait]=*'
  );
  const { data: bannerRaw } = await getData(
    '/api/works?fields[0]=title&fields[1]=slug&populate[0]=banner&filters[show_banner][$eq]=true'
  );

  const workData = workDataRaw?.map((item: any) => {
    const {
      portrait: { data }
    } = item?.attributes;

    return {
      id: item?.id,
      slug: item?.attributes?.slug,
      title: item?.attributes?.title,
      gallery: data?.attributes?.formats?.large?.url ?? data?.attributes?.url
    };
  });

  const bannerData = bannerRaw?.map((item: any) => {
    return {
      id: item?.id,
      slug: item?.attributes?.slug,
      title: item?.attributes?.title,
      url:
        item?.attributes?.banner?.data?.attributes?.formats?.large?.url ??
        item?.attributes?.banner?.data?.attributes?.url
    };
  });

  return {
    props: {
      footerData,
      workData,
      bannerData
    }
  };
};
