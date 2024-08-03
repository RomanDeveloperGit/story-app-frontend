import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, sample } from 'effector';

import { api } from '@/infrastructure/api';
import {
  makeHeadersWithFilledAccessToken,
  removeAccessTokenFromLocalStorage,
} from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';
import { DEFAULT_ROUTE, getRouteInstance } from '@/infrastructure/router';

import { setAuthorizedUser } from '@/entities/auth';

export const logOut = createEvent();
export const logOutFx = createApiEffect<void, void>(async () =>
  api.post('/api/v1/auth/log-out', { headers: makeHeadersWithFilledAccessToken() }).json(),
);

sample({
  clock: logOut,
  target: logOutFx,
});

export const logOutSuccessFx = createEffect<void, void>(() => {
  removeAccessTokenFromLocalStorage();
  setAuthorizedUser(null);

  getRouteInstance(DEFAULT_ROUTE.UNAUTHORIZED).open();

  notifications.show({
    message: 'You logged out of your account',
    color: 'green',
  });
});

sample({
  clock: logOutFx.doneData,
  target: logOutSuccessFx,
});
