import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { ErrorBoundary } from './error-boundary';
import { AppRouterProvider } from './router';

import './app.css';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <AppRouterProvider />
      </ChakraProvider>
    </ErrorBoundary>
  );
};
