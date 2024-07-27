import { FC } from 'react';

import { createRoutesView, RouterProvider } from 'atomic-router-react';

import { ROUTE_CONFIGS } from './config';
import { router } from './router';

const RoutesView = createRoutesView({ routes: ROUTE_CONFIGS });

export const AppRouter: FC = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
