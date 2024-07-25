import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { logInPageRoute, signUpPageRoute } from '@/infrastructure/routes';

import { LogInPage } from '@/pages/log-in';
import { SignUpPage } from '@/pages/sign-up';

import { UnauthorizedLayout } from '@/app/layouts/unauthorized-layout';

export type RouteConfig = Parameters<typeof createRoutesView>[0]['routes'][0] &
  Parameters<typeof createHistoryRouter>['0']['routes'][0] & {
    route: Exclude<Parameters<typeof createHistoryRouter>['0']['routes'][0]['route'], unknown[]>;
  };

type RouteConfigs = RouteConfig[];

export const unauthorizedRouteConfigs = [
  {
    path: '/log-in',
    route: logInPageRoute,
    view: LogInPage,
    layout: UnauthorizedLayout,
  },
  {
    path: '/sign-up',
    route: signUpPageRoute,
    view: SignUpPage,
    layout: UnauthorizedLayout,
  },
] satisfies RouteConfigs;

export const authorizedUserRouteConfigs = [] satisfies RouteConfigs;

export const authorizedAdminRouteConfigs = [] satisfies RouteConfigs;

export const routeConfigs = [
  ...unauthorizedRouteConfigs,
  ...authorizedUserRouteConfigs,
  ...authorizedAdminRouteConfigs,
] satisfies RouteConfigs;
