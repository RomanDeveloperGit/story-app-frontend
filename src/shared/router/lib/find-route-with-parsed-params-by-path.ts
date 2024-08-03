import { match } from 'path-to-regexp';

import { Route } from './create-route';

interface RouteWithParsedParams {
  route: Route;
  parsedParams: Exclude<ReturnType<ReturnType<typeof match>>, false>['params'];
}

export const findRouteWithParsedParamsByPath = (
  path: string,
  routesForSearching: Route[],
): RouteWithParsedParams | undefined => {
  let parsedParamsForFoundRoute: RouteWithParsedParams['parsedParams'] = {};

  const foundRoute = routesForSearching.find((route) => {
    const checkMatching = match(route.path);
    const result = checkMatching(path);

    if (result) {
      parsedParamsForFoundRoute = result.params;
    }

    return result;
  });

  if (!foundRoute) return undefined;

  return {
    route: foundRoute,
    parsedParams: parsedParamsForFoundRoute,
  };
};
