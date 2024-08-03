import { RouteParams } from 'atomic-router';

import { Route } from './create-route';

export const getRouteInstance = <T extends RouteParams>(route: Route<T>) => {
  return route.instance;
};
