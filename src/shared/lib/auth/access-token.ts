const ACCESS_TOKEN_KEY = 'access-token';

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const saveAccessTokenInLocalStorage = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const makeHeadersWithAccessToken = (token: string, headers?: Record<string, string>) => {
  return {
    Authorization: `Bearer ${token}`,
    ...headers,
  };
};

export const makeHeadersWithFilledAccessToken = (headers?: Record<string, string>) => {
  const accessToken = getAccessTokenFromLocalStorage();

  return makeHeadersWithAccessToken(String(accessToken), headers);
};
