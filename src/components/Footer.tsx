import { Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface Link {
  name: string;
  link: string;
}

interface Props {
  footerData?: {
    id: string;
    attributes: Link;
  }[];
}

export const Footer = ({ footerData }: Props) => {
  return (
    <Flex
      flexDir={{ base: 'column', lg: 'row' }}
      justifyContent="space-between"
      gap={4}
      py={6}
      px={20}
    >
      <Text opacity={0.5}>
        &copy; {new Date().getFullYear()} Dimas Wisnu Prakoso
      </Text>
      <HStack spacing={{ base: 2, lg: 10 }} flexWrap="wrap">
        {footerData?.map((item, index) => (
          <Link
            key={index}
            href={`https://${item.attributes.link.replaceAll('https://', '')}`}
            target="_blank"
          >
            <Text
              opacity={0.5}
              cursor="pointer"
              _hover={{
                opacity: 1
              }}
              transition="all 0.3s ease"
            >
              {item.attributes.name}
            </Text>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};
