import { Grid, GridItem, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface ArtProps {
  id: number;
  slug: string;
  title: string;
  gallery: string;
}

interface Props {
  workData: ArtProps[];
}

export const WorkGrid = ({ workData }: Props) => (
  <Grid
    templateColumns={{
      base: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(3, 1fr)'
    }}
    gap={6}
  >
    {workData?.map((item: ArtProps, index: number) => (
      <Link href={`/work/${item.slug}`} key={index}>
        <GridItem
          w="100%"
          h="auto"
          position="relative"
          _hover={{
            '> p': {
              opacity: 1
            },
            '> img': {
              opacity: 0.7
            }
          }}
          sx={{
            '> img': {
              transition: 'all 0.3s ease-in-out'
            }
          }}
          cursor="pointer"
          display="flex"
          alignItems="center"
        >
          <Image
            alt=""
            src={process.env.API_URL + item.gallery}
            objectFit="cover"
            draggable="false"
            transition="all 0.3s ease-in-out"
          />
          <Text
            position="absolute"
            bottom="0"
            left="0"
            opacity="0"
            w="100%"
            bg="#020202BB"
            color="white"
            px={6}
            py={2}
            transition="all 0.6s ease-in-out"
            fontSize={{ base: 'lg', lg: '2xl' }}
          >
            {item.title.toUpperCase()}
          </Text>
        </GridItem>
      </Link>
    ))}
  </Grid>
);
