import { match } from 'path-to-regexp';

import { RouteConfig } from '@/app/router/config';

interface RouteWithParsedParams {
  route: RouteConfig['route'];
  parsedParams: Exclude<ReturnType<ReturnType<typeof match>>, false>['params'];
}

export const findRouteWithParsedParamsByPath = (
  path: string,
  routeConfigsForSearching: RouteConfig[],
): RouteWithParsedParams | undefined => {
  let parsedParamsForFoundRoute: RouteWithParsedParams['parsedParams'] = {};

  const foundRouteConfig = routeConfigsForSearching.find((route) => {
    const checkMatching = match(route.path);
    const result = checkMatching(path);

    if (result) {
      parsedParamsForFoundRoute = result.params;
    }

    return result;
  });

  if (!foundRouteConfig) return undefined;

  return {
    route: foundRouteConfig.route,
    parsedParams: parsedParamsForFoundRoute,
  };
};
