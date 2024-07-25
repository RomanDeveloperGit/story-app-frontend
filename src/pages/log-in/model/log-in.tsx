import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, sample } from 'effector';

import { api, ApiError, Dto } from '@/infrastructure/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';

import { setAuthorizedUser } from '@/entities/auth';

import { LogInSchema } from './log-in-schema';

export const logIn = createEvent<LogInSchema>();
export const logInFx = createApiEffect<Dto['LogInRequest'], Dto['LogInResponse']>(async (params) =>
  api.post('/api/v1/auth/log-in', { json: params }).json<Dto['LogInResponse']>(),
);

sample({
  clock: logIn,
  target: logInFx,
});

export const logInSuccessFx = createEffect<Dto['LogInResponse'], Dto['LogInResponse']>(
  (response) => {
    saveAccessTokenInLocalStorage(response.accessToken);
    setAuthorizedUser(response.user);

    notifications.show({
      message: 'You logged into your account',
      color: 'green',
    });

    return response;
  },
);

sample({
  clock: logInFx.doneData,
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
