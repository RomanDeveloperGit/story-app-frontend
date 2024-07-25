import { FC } from 'react';

import { createRoutesView, RouterProvider } from 'atomic-router-react';

import { routeConfigs } from './config';
import { router } from './router';

const RoutesView = createRoutesView({ routes: routeConfigs });

export const AppRouter: FC = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
