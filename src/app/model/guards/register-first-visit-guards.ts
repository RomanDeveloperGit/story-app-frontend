import { api, Dto } from '@/infrastructure/api';
import {
  getAccessTokenFromLocalStorage,
  makeHeadersWithAccessToken,
} from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';

import { setAuthorizedUser } from '@/entities/auth';

import { redirectToDefaultPageFx } from '@/app/lib/redirect-to-default-page';

import { availableRoutes } from '../config';
import { findRouteWithParsedParamsByPath } from './lib/find-route-with-parsed-params-by-path';
import { redirectAfterAuthorizationFx } from './lib/redirect-after-authorization';
import { VisitData } from './lib/visit-data';
import { setVisitDataFromUnauthorizedUser } from './register-post-auth-guards';

const checkAccessTokenFx = createApiEffect<string, Dto['CheckAccessTokenResponse']>((accessToken) =>
  api
    .get('/api/v1/auth/access-token/check', { headers: makeHeadersWithAccessToken(accessToken) })
    .json<Dto['CheckAccessTokenResponse']>(),
);

export const registerFirstVisitGuards = async () => {
  const visitData: VisitData = {
    path: window.location.pathname,
    query: Object.fromEntries(new URLSearchParams(window.location.search).entries()),
  };

  try {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken?.length) {
      throw new Error('The token was not detected');
    }

    const authorizedUser = await checkAccessTokenFx(accessToken);

    setAuthorizedUser(authorizedUser);
    redirectAfterAuthorizationFx({
      role: 'user', // temporary
      visitData,
    });
  } catch (error) {
    const foundRouteData = findRouteWithParsedParamsByPath(
      visitData.path,
      availableRoutes.unauthorized,
    );

    if (!foundRouteData) {
      setVisitDataFromUnauthorizedUser(visitData);

      redirectToDefaultPageFx();
    }
  }
};
