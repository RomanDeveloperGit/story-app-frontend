import { createHistoryRouter, createRoute } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { MainPage } from '@/pages/main';

export const mainRoute = createRoute();

export const routes: Parameters<typeof createHistoryRouter>[0]['routes'] = [
  {
    path: '/',
    route: mainRoute,
  },
];

export const RoutesView = createRoutesView({
  routes: [
    {
      route: mainRoute,
      view: MainPage,
    },
  ],
});
