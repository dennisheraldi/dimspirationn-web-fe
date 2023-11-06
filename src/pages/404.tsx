import { Layout } from '@/components/Layout';
import { Button, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <VStack alignItems="center" justifyContent="center" h="50vh" spacing={5}>
        <Heading fontSize="5xl" textAlign="center">
          The page you&apos;re looking
          <br />
          for is not found
        </Heading>
        <Link href="/">
          <Button colorScheme="blue" variant="outline" fontSize="xl" size="lg">
            Go back to home
          </Button>
        </Link>
      </VStack>
    </Layout>
  );
}
