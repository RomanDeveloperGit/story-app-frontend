import { createEvent, createStore, sample } from 'effector';

import { logOutSuccessFx } from '@/layouts/authorized-user-layout';

import { logInSuccessFx } from '@/pages/log-in';
import { signUpSuccessFx } from '@/pages/sign-up';

import { openDefaultPageFx } from '@/app/model/guards/lib/open-default-page';

import { redirectAfterAuthorizationFx } from './lib/redirect-after-authorization';
import { VisitData } from './lib/visit-data';

export const setVisitDataFromUnauthorizedUser = createEvent<VisitData>();

const $visitDataFromUnauthorizedUser = createStore<VisitData>(null);
$visitDataFromUnauthorizedUser.on(setVisitDataFromUnauthorizedUser, (_, payload) => payload);

export const registerPostAuthGuards = async () => {
  // TODO: maybe, to move it to auth feature?
  // TODO: maybe, to rename the "visitDataFromUnauthorizedUser" to just the "visitData"? To think about all cases

  sample({
    clock: [logInSuccessFx.doneData, signUpSuccessFx.doneData],
    source: $visitDataFromUnauthorizedUser,
    fn(visitDataFromUnauthorizedUser, authorizationData) {
      return {
        visitData: visitDataFromUnauthorizedUser,
        role: authorizationData.user.role,
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
    target: openDefaultPageFx,
  });
};
