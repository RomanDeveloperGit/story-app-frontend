import { createEffect } from 'effector';

import { Dto } from '@/infrastructure/api';

import { DEFAULT_ROUTE } from '@/app/model/config';

export const openDefaultPageFx = createEffect<Dto['AuthorizedUser']['role'] | void, void>(
  (role) => {
    DEFAULT_ROUTE[role || 'UNAUTHORIZED'].open();
  },
);
