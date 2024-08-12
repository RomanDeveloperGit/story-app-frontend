import { createEffect } from 'effector';

import { api } from '@/shared/api';
import {
  makeHeadersWithFilledAccessToken,
  removeAccessTokenFromLocalStorage,
} from '@/shared/lib/access-token';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import { DEFAULT_ROUTE, getRouteInstance } from '@/shared/router';

import { setAuthorizedUser } from '@/entities/auth';

export const logOutFx = createEffect<void, void>(async () => {
  try {
    await api.post('/api/v1/auth/log-out', { headers: makeHeadersWithFilledAccessToken() }).json();

    removeAccessTokenFromLocalStorage();
    setAuthorizedUser(null);

    getRouteInstance(DEFAULT_ROUTE.UNAUTHORIZED).open();

    showSuccessNotificationFx({
      message: 'You logged out of your account',
    });
  } catch (error) {
    showDefaultErrorNotificationFx({ message: 'Authorization error' });
  }
});
