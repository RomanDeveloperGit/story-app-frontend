import type { RouteInstance } from 'atomic-router';

import { logInPageRoute } from '@/infrastructure/routes';

import { Role } from '@/entities/auth';

import {
  authorizedAdminRouteConfigs,
  authorizedUserRouteConfigs,
  RouteConfig,
  unauthorizedRouteConfigs,
} from '@/app/router/config';

type RoleWithUnauthorizedStatus = Role | 'unauthorized';

// Default Route is a route to which we redirect the user on the first visit to the application or after successful authorization,
// IF he does not have a special link on the first visit
// Also, they are used when clicking on the logo and similar elements
export const defaultRoute = {
  unauthorized: logInPageRoute,
  user: logInPageRoute,
  admin: logInPageRoute,
  // I only use "any" for TS compiler (ts-compiler moments ^_^)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} satisfies Record<RoleWithUnauthorizedStatus, RouteInstance<any>>;

// Available Routes - a list of routes that are available for a specific role or an unauthorized user
export const availableRoutes = {
  unauthorized: unauthorizedRouteConfigs,
  user: authorizedUserRouteConfigs,
  admin: [...authorizedUserRouteConfigs, ...authorizedAdminRouteConfigs],
} satisfies Record<RoleWithUnauthorizedStatus, RouteConfig[]>;
