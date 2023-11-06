import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#202020'
      },
      '*': {
        '&::-webkit-scrollbar': {
          w: '0'
        }
      }
    }
  }
});

export default theme;
