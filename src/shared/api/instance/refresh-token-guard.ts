import ky from 'ky';

import {
  AUTHORIZATION_HEADER_KEY,
  getAccessTokenExpirationMsFromLocalStorage,
  saveAccessTokenInLocalStorage,
  toBearerToken,
} from '@/shared/lib/access-token';
import {
  DEFAULT_ROUTE,
  getRouteInstance,
  isRouteExistByPath,
  UNAUTHORIZED_ROUTES,
} from '@/shared/router';

import { Dto } from '../auto-generation/dto';

let refreshTokensProcess: Promise<string> | null = null;

// I placed this logic here because I can't add this hook at the "app" layer, "Ky" doesn't provide such an opportunity
// But this is ok, because it seems like the logic of the infrastructure (the refreshing process is related to a technical need, and not to any business feature)
export const refreshTokensGuard = (request: Request) => {
  const accessTokenExpirationMs = getAccessTokenExpirationMsFromLocalStorage();
  const canBeAuthorized = accessTokenExpirationMs !== null;

  if (canBeAuthorized && Date.now() > accessTokenExpirationMs && !refreshTokensProcess) {
    refreshTokensProcess = new Promise<string>((resolve, reject) => {
      ky.post('/api/v1/auth/refresh', {
        retry: {
          limit: 1,
          methods: ['post'],
        },
      })
        .json<Dto['RefreshResponse']>()
        .then((response) => {
          saveAccessTokenInLocalStorage(response.accessToken);

          resolve(response.accessToken);
        })
        .catch(async (error) => {
          if (!isRouteExistByPath(window.location.pathname, UNAUTHORIZED_ROUTES)) {
            await getRouteInstance(DEFAULT_ROUTE.UNAUTHORIZED).open();
          }

          reject(error);
        });
    });

    refreshTokensProcess
      .then() // only for chaining all "then" below
      .catch() // only for chaining all "catch" below
      .finally(() => {
        refreshTokensProcess = null;
      });
  }

  if (!request.headers.has(AUTHORIZATION_HEADER_KEY) || !refreshTokensProcess) {
    return request;
  }

  return new Promise<Request>((resolve, reject) => {
    refreshTokensProcess!
      .then((newAccessToken) => {
        request.headers.set(AUTHORIZATION_HEADER_KEY, toBearerToken(newAccessToken));

        resolve(request);
      })
      .catch(() => reject());
  });
};
