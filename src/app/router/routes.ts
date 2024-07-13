import { createHistoryRouter, createRoute } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { DefaultLayout } from '@/layouts/default-layout';
import { LogInPage } from '@/pages/log-in';
import { MainPage } from '@/pages/main';
import { SignUpPage } from '@/pages/sign-up';

export const mainPageRoute = createRoute();
export const logInPageRoute = createRoute();
export const signUpPageRoute = createRoute();

export const routes: Parameters<typeof createHistoryRouter>[0]['routes'] = [
  {
    path: '/',
    route: mainPageRoute,
  },
  {
    path: '/log-in',
    route: logInPageRoute,
  },
  {
    path: '/sign-up',
    route: signUpPageRoute,
  },
];

export const RoutesView = createRoutesView({
  routes: [
    {
      route: mainPageRoute,
      view: MainPage,
      layout: DefaultLayout,
    },
    {
      route: logInPageRoute,
      view: LogInPage,
      layout: DefaultLayout,
    },
    {
      route: signUpPageRoute,
      view: SignUpPage,
      layout: DefaultLayout,
    },
  ],
});
