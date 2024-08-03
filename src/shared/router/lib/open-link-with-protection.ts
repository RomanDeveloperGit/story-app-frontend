import { Route } from './create-route';
import { findRouteWithParsedParamsByPath } from './find-route-with-parsed-params-by-path';

export const openLinkWithProtection = async ({
  link,
  availableRoutes,
  fallback,
}: {
  link: string;
  availableRoutes: Route[];
  fallback: () => Promise<void>;
}): Promise<void> => {
  try {
    const url = new URL(link);
    const foundRouteData = findRouteWithParsedParamsByPath(url.pathname, availableRoutes);

    if (!foundRouteData) {
      return fallback();
    }

    await foundRouteData.route.instance.navigate({
      params: foundRouteData.parsedParams,
      query: Object.fromEntries(url.searchParams.entries()),
    });
  } catch (_) {
    return fallback();
  }
};
