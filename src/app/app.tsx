import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { AppRouterProvider } from './router';

import './app.scss';

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <AppRouterProvider />
    </ChakraProvider>
  );
};
