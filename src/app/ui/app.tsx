import React, { Fragment } from 'react';

import '@mantine/core/styles.css';
import { LoadingOverlay, MantineProvider } from '@mantine/core';

import { useUnit } from 'effector-react';

import { $isAppVisible } from '../model/model';
import { AppRouter } from '../router/app-router';
import { ErrorBoundary } from './error-boundary/error-boundary';
import { NotificationManager } from './notification-manager/notification-manager';

import './app.css';

export const App: React.FC = () => {
  const isAppVisible = useUnit($isAppVisible);

  return (
    <MantineProvider>
      <ErrorBoundary>
        <LoadingOverlay visible={!isAppVisible} />
        {/* TODO: to think about SSR with these null/the normal content/the loader (with effector state), get more details. На серваке стор инитится или не?*/}
        {isAppVisible ? (
          <Fragment>
            <AppRouter />
            <NotificationManager />
          </Fragment>
        ) : null}
      </ErrorBoundary>
    </MantineProvider>
  );
};
