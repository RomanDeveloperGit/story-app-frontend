import type { RouteInstance } from 'atomic-router';

import { Dto } from '@/infrastructure/api';

import {
  AUTHORIZED_ADMIN_ROUTE_CONFIGS,
  AUTHORIZED_USER_ROUTE_CONFIGS,
  logInPageRoute,
  RouteConfig,
  UNAUTHORIZED_ROUTE_CONFIGS,
} from '@/app/router/config';

type RoleWithUnauthorizedStatus = Dto['AuthorizedUser']['role'] | 'UNAUTHORIZED';

// Default Route is a route to which we redirect the user on the first visit to the application or after successful authorization,
// IF he does not have a special link on the first visit
// Also, they are used when clicking on the logo and similar elements
export const DEFAULT_ROUTE = {
  UNAUTHORIZED: logInPageRoute,
  USER: logInPageRoute,
  ADMIN: logInPageRoute,
  // I only use "any" for TS compiler (ts-compiler moments ^_^)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<RoleWithUnauthorizedStatus, RouteInstance<any>>;

// Available Routes - a list of routes that are available for a specific role or an unauthorized user
export const AVAILABLE_ROUTES = {
  UNAUTHORIZED: UNAUTHORIZED_ROUTE_CONFIGS,
  USER: AUTHORIZED_USER_ROUTE_CONFIGS,
  ADMIN: [...AUTHORIZED_USER_ROUTE_CONFIGS, ...AUTHORIZED_ADMIN_ROUTE_CONFIGS],
} satisfies Record<RoleWithUnauthorizedStatus, RouteConfig[]>;
