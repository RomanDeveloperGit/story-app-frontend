import { logInRoute } from './routes';

// Default Route is a route to which we redirect the user on the first visit to the application or after successful authorization,
// IF he does not have a special link on the first visit
// Also, they are used when clicking on the logo and similar elements
export const DEFAULT_ROUTE = {
  UNAUTHORIZED: logInRoute,
  USER: logInRoute,
  ADMIN: logInRoute,
};
