import ky from 'ky';

import {
  AUTHORIZATION_HEADER_KEY,
  getAccessTokenExpirationMsFromLocalStorage,
  getAccessTokenFromLocalStorage,
  saveAccessTokenInLocalStorage,
  toBearerToken,
} from '@/shared/lib/access-token';

import { Dto } from '../auto-generation/dto';

let refreshTokensProcess: Promise<string> | null = null;

// I placed this logic here because I can't add this hook at the "app" layer, "Ky" doesn't provide such an opportunity
// But this is ok, because it seems like the logic of the infrastructure (the refreshing process is related to a technical need, and not to any business feature)
export const refreshTokensGuard = (request: Request) => {
  const hasSavedAccessToken = Boolean(getAccessTokenFromLocalStorage());
  const accessTokenExpirationMs = getAccessTokenExpirationMsFromLocalStorage() ?? 0;

  if (Date.now() > accessTokenExpirationMs && !refreshTokensProcess && hasSavedAccessToken) {
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
        .catch(reject);
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
