import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, createStore, sample } from 'effector';

import { omit } from 'lodash';

import { api, Dto } from '@/infrastructure/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';
import { createApiEffect } from '@/infrastructure/lib/effector';

import { setAuthorizedUser } from '@/entities/auth';

import { SignUpSchema } from './sign-up-schema';

export const signUp = createEvent<SignUpSchema>();
export const signUpFx = createApiEffect<Dto['SignUpRequest'], Dto['SignUpResponse']>(async (data) =>
  api.post('/api/v1/auth/sign-up', { json: data }).json<Dto['SignUpResponse']>(),
);

sample({
  clock: signUp,
  fn(data) {
    return omit(data, 'confirmPassword');
  },
  target: signUpFx,
});

export const signUpSuccessFx = createEffect<Dto['SignUpResponse'], Dto['SignUpResponse']>(
  (response) => {
    saveAccessTokenInLocalStorage(response.accessToken);
    setAuthorizedUser(response.user);

    notifications.show({
      message: 'You registered an account',
      color: 'green',
    });

    return response;
  },
);

sample({
  clock: signUpFx.doneData,
  target: signUpSuccessFx,
});

export const resetSignUpError = createEvent();

export const $signUpError = createStore<string | null>(null);
$signUpError
  .on(signUpFx.failData, (state, payload) => {
    if (payload.code === 'ERROR_EMAIL_TAKEN') return 'A user with this email already exists';

    return state;
  })
  .reset(signUp, resetSignUpError);

const signUpUnexpectedErrorFx = createEffect<void, void>(() => {
  notifications.show({
    title: 'Registration error',
    message: 'Something went wrong',
    color: 'red',
  });
});

sample({
  clock: signUpFx.failData,
  filter(error) {
    return !error.code;
  },
  target: signUpUnexpectedErrorFx,
});
