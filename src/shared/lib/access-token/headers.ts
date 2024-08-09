import { getAccessTokenFromLocalStorage } from './local-storage';

export const AUTHORIZATION_HEADER_KEY = 'Authorization';

export const toBearerToken = (token: string) => `Bearer ${token}`;

export const makeHeadersWithAccessToken = (token: string, headers?: Record<string, string>) => {
  return {
    [AUTHORIZATION_HEADER_KEY]: toBearerToken(token),
    ...headers,
  };
};

export const makeHeadersWithFilledAccessToken = (headers?: Record<string, string>) => {
  const accessToken = getAccessTokenFromLocalStorage();

  return makeHeadersWithAccessToken(String(accessToken), headers);
};
