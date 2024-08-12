import { createEffect, createEvent, sample } from 'effector';

import { api, Dto, isApiError } from '@/shared/api';
import { saveAccessTokenInLocalStorage } from '@/shared/lib/access-token';
import {
  showDefaultErrorNotificationFx,
  showNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';

import {
  $savedLinkFromFirstVisit,
  redirectAfterAuthorization,
  resetSavedLinkFromFirstVisit,
  setAuthorizedUser,
} from '@/entities/auth';

import { LogInSchema } from './log-in-schema';

export const logIn = createEvent<LogInSchema>();
export const logInFx = createEffect<
  {
    requestData: Dto['LogInRequest'];
    savedLinkFromFirstVisit: string | null;
  },
  void
>(async ({ requestData, savedLinkFromFirstVisit }) => {
  try {
    const response = await api
      .post('/api/v1/auth/log-in', { json: requestData })
      .json<Dto['LogInResponse']>();

    saveAccessTokenInLocalStorage(response.accessToken);
    setAuthorizedUser(response.user);

    redirectAfterAuthorization({
      role: response.user.role,
      link: savedLinkFromFirstVisit,
    });

    if (savedLinkFromFirstVisit) {
      resetSavedLinkFromFirstVisit();
    }

    showSuccessNotificationFx({
      message: 'You logged into your account',
    });
  } catch (error) {
    if (isApiError(error) && error.response.parsedError.code === 'ERROR_USER_NOT_FOUND') {
      showNotificationFx({
        title: 'Authorization error',
        message: 'Check the correctness of the entered data',
      });
    } else {
      showDefaultErrorNotificationFx({ message: 'Authorization error' });
    }
  }
});

sample({
  clock: logIn,
  source: $savedLinkFromFirstVisit,
  fn(savedLinkFromFirstVisit, requestData) {
    return { requestData, savedLinkFromFirstVisit };
  },
  target: logInFx,
});
