import { api, Dto } from '@/infrastructure/api';
import {
  getAccessTokenFromLocalStorage,
  makeHeadersWithAccessToken,
} from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';
import {
  DEFAULT_ROUTE,
  getRouteInstance,
  openLinkWithProtection,
  PERMITTED_ROUTES,
} from '@/infrastructure/router';

import {
  redirectAfterAuthorization,
  setAuthorizedUser,
  setSavedLinkFromFirstVisit,
} from '@/entities/auth';

const checkAccessTokenFx = createApiEffect<string, Dto['CheckAccessTokenResponse']>((accessToken) =>
  api
    .get('/api/v1/auth/access-token/check', { headers: makeHeadersWithAccessToken(accessToken) })
    .json<Dto['CheckAccessTokenResponse']>(),
);

export const registerFirstVisitGuard = async () => {
  const href = window.location.href;

  try {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken?.length) {
      throw new Error('The token was not detected');
    }

    const authorizedUser = await checkAccessTokenFx(accessToken);

    setAuthorizedUser(authorizedUser);
    await redirectAfterAuthorization({
      role: authorizedUser.role,
      link: href,
    });
  } catch (error) {
    await openLinkWithProtection({
      link: window.location.href,
      availableRoutes: PERMITTED_ROUTES.UNAUTHORIZED,
      fallback: async () => {
        setSavedLinkFromFirstVisit(href);

        await getRouteInstance(DEFAULT_ROUTE.UNAUTHORIZED).open();
      },
    });
  }
};
