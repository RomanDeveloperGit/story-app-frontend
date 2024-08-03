import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, sample } from 'effector';

import { api, ApiError, Dto } from '@/infrastructure/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';

import {
  $savedLinkFromFirstVisit,
  redirectAfterAuthorization,
  resetSavedLinkFromFirstVisit,
  setAuthorizedUser,
} from '@/entities/auth';

import { LogInSchema } from './log-in-schema';

export const logIn = createEvent<LogInSchema>();
export const logInFx = createApiEffect<Dto['LogInRequest'], Dto['LogInResponse']>(async (data) =>
  api.post('/api/v1/auth/log-in', { json: data }).json<Dto['LogInResponse']>(),
);

sample({
  clock: logIn,
  target: logInFx,
});

export const logInSuccessFx = createEffect<
  {
    response: Dto['LogInResponse'];
    savedLinkFromFirstVisit: string | null;
  },
  void
>(({ response, savedLinkFromFirstVisit }) => {
  saveAccessTokenInLocalStorage(response.accessToken);
  setAuthorizedUser(response.user);

  redirectAfterAuthorization({
    role: response.user.role,
    link: savedLinkFromFirstVisit,
  });

  if (savedLinkFromFirstVisit) {
    resetSavedLinkFromFirstVisit();
  }

  notifications.show({
    message: 'You logged into your account',
    color: 'green',
  });
});

sample({
  clock: logInFx.doneData,
  source: $savedLinkFromFirstVisit,
  fn(savedLinkFromFirstVisit, response) {
    return {
      response,
      savedLinkFromFirstVisit,
    };
  },
  target: logInSuccessFx,
});

const logInErrorFx = createEffect<ApiError, void>((error) => {
  if (error.code === 'ERROR_USER_NOT_FOUND') {
    notifications.show({
      title: 'Authorization error',
      message: 'Check the correctness of the entered data',
      color: 'red',
    });
  } else {
    notifications.show({
      title: 'Authorization error',
      message: 'Something went wrong',
      color: 'red',
    });
  }
});

sample({
  clock: logInFx.failData,
  target: logInErrorFx,
});
