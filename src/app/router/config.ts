import { createHistoryRouter, createRoute } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { LogInPage } from '@/pages/log-in';
import { SignUpPage } from '@/pages/sign-up';

type RoutesViewRouteConfig = Parameters<typeof createRoutesView>[0]['routes'][0];
type HistoryRouterRouteConfig = Parameters<typeof createHistoryRouter>['0']['routes'][0] & {
  route: Exclude<Parameters<typeof createHistoryRouter>['0']['routes'][0]['route'], unknown[]>;
};

export type RouteConfig = Omit<RoutesViewRouteConfig & HistoryRouterRouteConfig, 'layout'>;

type RouteConfigs = RouteConfig[];

export const logInPageRoute = createRoute();
export const signUpPageRoute = createRoute();
export const UNAUTHORIZED_ROUTE_CONFIGS = [
  {
    path: '/log-in',
    route: logInPageRoute,
    view: LogInPage,
  },
  {
    path: '/sign-up',
    route: signUpPageRoute,
    view: SignUpPage,
  },
] satisfies RouteConfigs;

export const AUTHORIZED_USER_ROUTE_CONFIGS = [] satisfies RouteConfigs;

export const AUTHORIZED_ADMIN_ROUTE_CONFIGS = [] satisfies RouteConfigs;

export const ROUTE_CONFIGS = [
  ...UNAUTHORIZED_ROUTE_CONFIGS,
  ...AUTHORIZED_USER_ROUTE_CONFIGS,
  ...AUTHORIZED_ADMIN_ROUTE_CONFIGS,
] satisfies RouteConfigs;
