import { notifications } from '@mantine/notifications';

import { createEffect, createEvent, createStore, sample } from 'effector';

import { omit } from 'lodash';

import { api, Dto } from '@/shared/api';
import { saveAccessTokenInLocalStorage } from '@/shared/lib/access-token';
import { createApiEffect } from '@/shared/lib/effector';

import {
  $savedLinkFromFirstVisit,
  redirectAfterAuthorization,
  resetSavedLinkFromFirstVisit,
  setAuthorizedUser,
} from '@/entities/auth';

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

export const signUpSuccessFx = createEffect<
  {
    response: Dto['SignUpResponse'];
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
    message: 'You registered an account',
    color: 'green',
  });
});

sample({
  clock: signUpFx.doneData,
  source: $savedLinkFromFirstVisit,
  fn(savedLinkFromFirstVisit, response) {
    return {
      response,
      savedLinkFromFirstVisit,
    };
  },
  target: signUpSuccessFx,
});

export const $signUpError = createStore<string | null>(null);
export const resetSignUpError = createEvent();

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
