import React from 'react';

import { AppRouterProvider } from './router';

import './app.scss';

// TODO: внедрить ErrorBoundary
export const App: React.FC = () => {
  // chakra
  return <AppRouterProvider />;
};
