import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, createStore, sample } from 'effector';

import { omit } from 'lodash';

import { api, ApiError, Dto, transformToApiError } from '@/infrastructure/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';

import { SignUpSchema } from './sign-up-schema';

export const signUp = createEvent<SignUpSchema>();
export const signUpFx = createEffect<Dto['SignUpRequest'], Dto['SignUpResponse'], ApiError>(
  async (data) => {
    try {
      const tokens = await api
        .post('/api/v1/auth/sign-up', { json: data })
        .json<Dto['SignUpResponse']>();

      saveAccessTokenInLocalStorage(tokens.accessToken);

      return tokens;
    } catch (error) {
      throw await transformToApiError(error);
    }
  },
);

sample({
  clock: signUp,
  fn(clockData) {
    return omit(clockData, 'confirmPassword');
  },
  target: signUpFx,
});

export const $signUpError = createStore<string | null>(null);

const signUpErrorFx = createEffect<ApiError, void>((data) => {
  if (!data.code) {
    notifications.show({
      title: 'Registration error',
      message: 'Something went wrong',
      color: 'red',
    });
  }
});

sample({
  clock: signUpFx.failData,
  target: signUpErrorFx,
});

$signUpError
  .on(signUpFx.failData, (state, payload) => {
    if (payload.code === 'ERROR_EMAIL_TAKEN') return 'A user with this email already exists';

    return state;
  })
  .reset(signUp);
