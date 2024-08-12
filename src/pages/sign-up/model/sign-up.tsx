import { createEffect, createEvent, createStore, sample } from 'effector';

import { omit } from 'lodash';

import { api, Dto, isApiError } from '@/shared/api';
import { saveAccessTokenInLocalStorage } from '@/shared/lib/access-token';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';

import {
  $savedLinkFromFirstVisit,
  redirectAfterAuthorization,
  resetSavedLinkFromFirstVisit,
  setAuthorizedUser,
} from '@/entities/auth';

import { SignUpSchema } from './sign-up-schema';

export const $signUpError = createStore<string | null>(null);
export const setSignUpError = createEvent<string | null>();

export const signUp = createEvent<SignUpSchema>();
export const signUpFx = createEffect<
  {
    requestData: Dto['SignUpRequest'];
    savedLinkFromFirstVisit: string | null;
  },
  void,
  unknown
>(async ({ requestData, savedLinkFromFirstVisit }) => {
  try {
    const response = await api
      .post('/api/v1/auth/sign-up', { json: requestData })
      .json<Dto['SignUpResponse']>();

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
      message: 'You registered an account',
    });
  } catch (error) {
    if (isApiError(error) && error.response.parsedError.code === 'ERROR_EMAIL_TAKEN') {
      setSignUpError('A user with this email already exists');
    } else {
      showDefaultErrorNotificationFx({ message: 'Authorization error' });
    }
  }
});

sample({
  clock: signUp,
  source: $savedLinkFromFirstVisit,
  fn(savedLinkFromFirstVisit, requestData) {
    return {
      requestData: omit(requestData, 'confirmPassword'),
      savedLinkFromFirstVisit,
    };
  },
  target: signUpFx,
});

$signUpError.on(setSignUpError, (_, error) => error).reset(signUp);
