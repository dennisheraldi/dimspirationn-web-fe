import { Layout } from '@/components/Layout';
import { getData } from '@/util/api';
import { VStack, Image, Text, Heading, Box, Link } from '@chakra-ui/react';
import { InferGetServerSidePropsType } from 'next';

export default function Contact({
  footerData,
  contactData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout footerData={footerData} title="About">
      <VStack spacing={5} alignItems="flex-start">
        <Image
          src={process.env.API_URL + contactData?.imageLink}
          alt=""
          objectFit="fill"
          w="100%"
          h={{ base: 'auto', lg: '500px' }}
          alignSelf="center"
          draggable={false}
        />
        <VStack spacing={1} alignItems="flex-start">
          <Heading fontSize="2xl">{contactData?.title ?? ''}</Heading>
          <Text fontSize="lg">{contactData?.description ?? ''}</Text>
        </VStack>
        <Box>
          <Box as="span">Kindly contact me at: </Box>
          <Link
            href={`mailto:${contactData?.email}`}
            isExternal
            fontWeight="bold"
          >
            {contactData?.email}
          </Link>
        </Box>
      </VStack>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { data: footerData } = await getData('/api/links');
  const { data: contactDataRaw } = await getData('/api/contact?populate=*');
  const contactData = {
    title: contactDataRaw?.attributes?.title,
    description: contactDataRaw?.attributes?.description,
    email: contactDataRaw?.attributes?.email,
    imageLink: contactDataRaw?.attributes?.banner?.data?.attributes?.url
  };

  return {
    props: {
      footerData,
      contactData
    }
  };
};
