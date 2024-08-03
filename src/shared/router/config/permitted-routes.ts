import { AUTHORIZED_ADMIN_ROUTES, AUTHORIZED_USER_ROUTES, UNAUTHORIZED_ROUTES } from './routes';

// Permitted Routes - a list of routes that are available for a specific role or an unauthorized user
export const PERMITTED_ROUTES = {
  UNAUTHORIZED: UNAUTHORIZED_ROUTES,
  USER: AUTHORIZED_USER_ROUTES,
  ADMIN: [...AUTHORIZED_USER_ROUTES, ...AUTHORIZED_ADMIN_ROUTES],
};
