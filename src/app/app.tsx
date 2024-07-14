import React from 'react';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { ErrorBoundary } from '@/infrastructure/ui/error-boundary';
import { NotificationManager } from '@/infrastructure/ui/notification-manager';

import { AppRouterProvider } from './router';

import './app.css';

export const App: React.FC = () => {
  return (
    <MantineProvider>
      <ErrorBoundary>
        <AppRouterProvider />
        <NotificationManager />
      </ErrorBoundary>
    </MantineProvider>
  );
};
