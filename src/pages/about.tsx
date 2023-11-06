import { Layout } from '@/components/Layout';
import { getData } from '@/util/api';
import { VStack, Image, Text } from '@chakra-ui/react';
import { InferGetServerSidePropsType } from 'next';

export default function About({
  footerData,
  aboutData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout footerData={footerData} title="About">
      <VStack spacing={5} alignItems="flex-start">
        <Image
          src={process.env.API_URL + aboutData?.imageLink}
          alt=""
          objectFit="cover"
          w="100%"
          h={{ base: 'auto', lg: '500px' }}
          alignSelf="center"
          draggable={false}
        />
        <Text>{aboutData?.description ?? ''}</Text>
      </VStack>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { data: footerData } = await getData('/api/links');
  const { data: aboutDataRaw } = await getData('/api/about?populate=*');
  const imageLink =
    aboutDataRaw?.attributes?.cover?.data?.attributes?.formats.large?.url;
  const description = aboutDataRaw?.attributes?.description;

  return {
    props: {
      footerData,
      aboutData: {
        imageLink,
        description
      }
    }
  };
};
