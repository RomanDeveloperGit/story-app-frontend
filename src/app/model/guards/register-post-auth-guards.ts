import { createEvent, createStore, sample } from 'effector';

import { logInSuccessFx } from '@/pages/log-in';
import { signUpSuccessFx } from '@/pages/sign-up';

import { logOutSuccessFx } from '@/app/layouts/authorized-user-layout';
import { redirectToDefaultPageFx } from '@/app/lib/redirect-to-default-page';

import { redirectAfterAuthorizationFx } from './lib/redirect-after-authorization';
import { VisitData } from './lib/visit-data';

export const setVisitDataFromUnauthorizedUser = createEvent<VisitData>();

const $visitDataFromUnauthorizedUser = createStore<VisitData>(null);
$visitDataFromUnauthorizedUser.on(setVisitDataFromUnauthorizedUser, (_, payload) => payload);

export const registerPostAuthGuards = async () => {
  sample({
    clock: [logInSuccessFx.done, signUpSuccessFx.done],
    source: $visitDataFromUnauthorizedUser,
    fn(sourceData) {
      return {
        visitData: sourceData,
        role: 'user', // temporary
      } satisfies Parameters<typeof redirectAfterAuthorizationFx>[0];
    },
    target: redirectAfterAuthorizationFx,
  });

  sample({
    clock: [logInSuccessFx.done, signUpSuccessFx.done],
    fn() {
      return null satisfies Parameters<typeof setVisitDataFromUnauthorizedUser>[0];
    },
    target: setVisitDataFromUnauthorizedUser,
  });

  sample({
    clock: logOutSuccessFx.done,
    fn() {},
    target: redirectToDefaultPageFx,
  });
};
