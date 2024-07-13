import { createEffect, createEvent, createStore, sample } from 'effector';

import { omit } from 'lodash';

import { api, Dto } from '@/infrastructure/api';
import { ApiError, transformToApiError } from '@/infrastructure/lib/api';
import { saveAccessTokenInLocalStorage } from '@/infrastructure/lib/auth';

import { CreateAccountSchema } from './create-account-schema';

export const createAccount = createEvent<CreateAccountSchema>();
export const createAccountFx = createEffect<Dto['SignUpRequest'], Dto['SignUpResponse'], ApiError>(
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
  clock: createAccount,
  fn(clockData) {
    return omit(clockData, 'confirmPassword');
  },
  target: createAccountFx,
});

export const $createAccountError = createStore<string | null>(null);

$createAccountError
  .on(createAccountFx.failData, (state, payload) => {
    if (payload.code === 'ERROR_USER_EXIST') return 'A user with this email already exists';

    // TODO: to push notification

    return state;
  })
  .reset(createAccount);
