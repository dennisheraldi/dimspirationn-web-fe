import { Layout } from '@/components/Layout';
import { WorkGrid } from '@/components/Work';
import { getData } from '@/util/api';
import { InferGetServerSidePropsType } from 'next';

function Work({
  footerData,
  workData
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout footerData={footerData} title="Work">
      <WorkGrid workData={workData} />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const { data: footerData } = await getData('/api/links');
  const { data: workDataRaw } = await getData(
    '/api/works?fields[0]=title&fields[1]=order&fields[2]=slug&sort[0]=order:asc&populate[portrait]=*'
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
      workData
    }
  };
};

export default Work;
