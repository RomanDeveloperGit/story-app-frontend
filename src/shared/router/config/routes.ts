import { createRoute } from '../lib/create-route';

export const logInRoute = createRoute('/log-in');
export const signUpRoute = createRoute('/sign-up');
export const UNAUTHORIZED_ROUTES = [logInRoute, signUpRoute];

export const AUTHORIZED_USER_ROUTES = [];

export const AUTHORIZED_ADMIN_ROUTES = [];

export const ROUTES = [
  ...UNAUTHORIZED_ROUTES,
  ...AUTHORIZED_USER_ROUTES,
  ...AUTHORIZED_ADMIN_ROUTES,
];
