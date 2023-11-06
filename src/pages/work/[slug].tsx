/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from '@/components/Layout';
import { WorkGrid } from '@/components/Work';
import { getData } from '@/util/api';
import {
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Image,
  Divider
} from '@chakra-ui/react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function WorkDetail({
  footerData,
  currentWork,
  workData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  useEffect(() => {
    if (!currentWork) {
      router.push('/work');
    }
  }, []);

  return (
    <Layout footerData={footerData} title={currentWork?.title}>
      <VStack spacing={5} alignItems="flex-start">
        <Heading fontSize="4xl">{currentWork?.title}</Heading>
        <Text fontSize="xl">{currentWork?.description}</Text>
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={4}
          justifyItems="center"
          w="100%"
        >
          {currentWork?.gallery?.map((url: any, index: number) => (
            <GridItem
              key={index}
              w="100%"
              h="auto"
              display="flex"
              justifyContent="center"
            >
              <Image
                alt=""
                src={process.env.API_URL + url}
                objectFit="cover"
                loading="lazy"
                draggable="false"
              />
            </GridItem>
          ))}
        </Grid>
        <Divider orientation="horizontal" w="100%" my={8} opacity={1} />
        <WorkGrid workData={workData} />
      </VStack>
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const { slug } = context.query;
  const { data: footerData } = await getData('/api/links');
  const { data: curWorkRaw } = await getData(
    `/api/works?populate[gallery]=*&filters[slug][$eq]=${slug}`
  );

  const currentWork = curWorkRaw.length
    ? {
        title: curWorkRaw[0]?.attributes?.title,
        description: curWorkRaw[0]?.attributes?.description,
        gallery: curWorkRaw[0]?.attributes?.gallery?.data?.map(
          (item: any) =>
            item?.attributes?.formats?.medium?.url ?? item?.attributes?.url
        )
      }
    : null;

  if (!currentWork) {
    return {
      props: {
        footerData,
        currentWork,
        workData: []
      }
    };
  }

  const { data: workDataRaw } = await getData(
    `/api/works?fields[0]=title&fields[1]=order&fields[2]=slug&sort[0]=order:asc&populate[portrait]=*&filters[slug][$ne]=${slug}`
  );

  const workData = workDataRaw?.map((item: any) => {
    const {
      portrait: { data }
    } = item?.attributes;

    return {
      id: item?.id,
      slug: item?.attributes?.slug,
      title: item?.attributes?.title,
      gallery: data?.attributes?.formats?.medium?.url ?? data?.attributes?.url
    };
  });

  return {
    props: {
      footerData,
      currentWork,
      workData
    }
  };
};

export default WorkDetail;
