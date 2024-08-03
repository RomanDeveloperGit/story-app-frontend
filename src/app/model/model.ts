import { createEvent, createStore } from 'effector';

import { registerFirstVisitGuard } from './register-first-visit-guard';

export const $isAppVisible = createStore<boolean>(false);
const showApp = createEvent();

$isAppVisible.on(showApp, () => true);

export const startApp = async () => {
  await registerFirstVisitGuard();

  showApp();
};
