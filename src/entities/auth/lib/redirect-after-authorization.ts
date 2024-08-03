import { Dto } from '@/infrastructure/api';
import {
  DEFAULT_ROUTE,
  getRouteInstance,
  openLinkWithProtection,
  PERMITTED_ROUTES,
} from '@/infrastructure/router';

export const redirectAfterAuthorization = async ({
  role,
  link,
}: {
  role: Dto['AuthorizedUser']['role'];
  link: string | null;
}): Promise<void> => {
  const openDefaultRoute = async () => {
    await getRouteInstance(DEFAULT_ROUTE[role]).open();
  };

  if (!link) {
    return openDefaultRoute();
  }

  return openLinkWithProtection({
    link,
    availableRoutes: PERMITTED_ROUTES[role],
    fallback: openDefaultRoute,
  });
};
