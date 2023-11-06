import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  HStack,
  Image,
  Text,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const Navbar = ({ color }: { color?: string }) => {
  const link = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Contact', href: '/contact' }
  ];
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      py={3}
      px={20}
      bg="transparent"
      color={color ?? 'black'}
      w="100%"
    >
      <Image
        src="/logo.png"
        width={90}
        height={90}
        alt=""
        objectFit="contain"
        draggable={false}
        cursor="pointer"
        onClick={() => {
          if (router.pathname !== '/') router.push('/');
        }}
      />
      <HStack spacing={16} display={{ base: 'none', md: 'flex' }}>
        {link
          .filter((item) => item.href !== '/')
          .map((item, index) => {
            const isActive = router.pathname.includes(item.href);
            return (
              <Text
                opacity={isActive ? 1 : 0.5}
                cursor="pointer"
                _hover={{
                  opacity: 1
                }}
                transition="all 0.3s ease"
                fontSize="xl"
                key={index}
                onClick={() => {
                  if (router.pathname !== item.href) router.push(item.href);
                }}
              >
                {item.label.toUpperCase()}
              </Text>
            );
          })}
      </HStack>
      <Box display={{ base: 'block', md: 'none' }} my="auto">
        <Button
          bg="transparent"
          borderRadius="full"
          alignSelf="center"
          transition="all 0.3s ease"
          _hover={{
            opacity: 0.5
          }}
          _active={{
            opacity: 0.5
          }}
          onClick={onOpen}
        >
          <HamburgerIcon w={8} h={8} />
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton
              size="lg"
              _hover={{ background: 'transparent', opacity: 0.5 }}
            />
            <DrawerHeader py={10} />
            <DrawerBody px={14} display="flex">
              <VStack spacing={5} alignItems="flex-start" width="100%">
                {link.map((item, index) => {
                  return (
                    <HStack
                      justifyContent="space-between"
                      cursor="pointer"
                      _hover={{
                        '> svg': {
                          opacity: 1
                        }
                      }}
                      key={index}
                      w="100%"
                      onClick={() => {
                        if (router.pathname !== item.href)
                          router.push(item.href);
                        onClose();
                      }}
                    >
                      <Text
                        cursor="pointer"
                        _hover={{
                          opacity: 1
                        }}
                        transition="all 0.3s ease"
                        fontSize="2xl"
                      >
                        {item.label.toUpperCase()}
                      </Text>
                      <ChevronRightIcon
                        w={8}
                        h={8}
                        opacity={0}
                        transition="all 0.3s ease-in-out"
                      />
                    </HStack>
                  );
                })}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Flex>
  );
};
