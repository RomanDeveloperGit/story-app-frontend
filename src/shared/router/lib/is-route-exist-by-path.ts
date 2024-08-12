import { match } from 'path-to-regexp';

import { Route } from './create-route';

export const isRouteExistByPath = (path: string, routesForSearching: Route[]): boolean => {
  return routesForSearching.some((route) => {
    const checkMatching = match(route.path);

    return Boolean(checkMatching(path));
  });
};
