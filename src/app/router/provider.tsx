import { FC } from 'react';

import { RouterProvider } from 'atomic-router-react';

import { router } from './router';
import { RoutesView } from './routes';

export const AppRouterProvider: FC = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
