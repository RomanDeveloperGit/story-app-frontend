export const saveAccessTokenInLocalStorage = (token: string) => {
  localStorage.setItem('access-token', token);
};
