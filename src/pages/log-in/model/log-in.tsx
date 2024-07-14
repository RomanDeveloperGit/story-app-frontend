import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, sample } from 'effector';

import { api, ApiError, Dto, transformToApiError } from '@/infrastructure/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';

import { LogInSchema } from './log-in-schema';

export const logIn = createEvent<LogInSchema>();
export const logInFx = createEffect<Dto['LogInRequest'], Dto['LogInResponse'], ApiError>(
  async (data) => {
    try {
      const tokens = await api
        .post('/api/v1/auth/log-in', { json: data })
        .json<Dto['LogInResponse']>();

      saveAccessTokenInLocalStorage(tokens.accessToken);

      return tokens;
    } catch (error) {
      throw await transformToApiError(error);
    }
  },
);

sample({
  clock: logIn,
  target: logInFx,
});

const logInErrorFx = createEffect<ApiError, void>((data) => {
  if (data.code === 'ERROR_USER_NOT_FOUND') {
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
