import { logInRoute, ROUTES, signUpRoute } from '@/infrastructure/router';

import { LogInPage } from '@/pages/log-in';
import { SignUpPage } from '@/pages/sign-up';

const routeView = new Map([
  [logInRoute, LogInPage],
  [signUpRoute, SignUpPage],
]);

export const ROUTE_CONFIGS = ROUTES.map((route) => ({
  route: route.instance,
  path: route.path,
  view: routeView.get(route)!,
}));
