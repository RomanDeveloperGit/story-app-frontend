import { createEffect } from 'effector';

import { Role } from '@/entities/auth';

import { defaultRoute } from '@/app/model/config';

export const openDefaultPageFx = createEffect<Role | void, void>((role) => {
  defaultRoute[role || 'unauthorized'].open();
});
