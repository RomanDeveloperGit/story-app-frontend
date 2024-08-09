import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access-token';
const ACCESS_TOKEN_EXPIRATION_MS_KEY = 'access-token-expiration-ms';

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getAccessTokenExpirationMsFromLocalStorage = () => {
  const accessTokenExpirationMs = localStorage.getItem(ACCESS_TOKEN_EXPIRATION_MS_KEY);

  return accessTokenExpirationMs ? Number(accessTokenExpirationMs) : null;
};

export const saveAccessTokenInLocalStorage = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

  try {
    localStorage.setItem(
      ACCESS_TOKEN_EXPIRATION_MS_KEY,
      String((jwtDecode(token).exp ?? 0) * 1000),
    );
  } catch (_) {
    localStorage.setItem(ACCESS_TOKEN_EXPIRATION_MS_KEY, '0');
  }
};

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXPIRATION_MS_KEY);
};
