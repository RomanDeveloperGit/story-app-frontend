import { createEvent, createStore } from 'effector';

import { registerFirstVisitGuards } from './guards/register-first-visit-guards';
import { registerPostAuthGuards } from './guards/register-post-auth-guards';

const showApp = createEvent();

export const $isAppVisible = createStore<boolean>(false);
$isAppVisible.on(showApp, () => true);

export const startApp = async () => {
  await registerFirstVisitGuards();
  await registerPostAuthGuards();

  showApp();
};
