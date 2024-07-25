import { createEffect } from 'effector';

import { Role } from '@/entities/auth';

import { defaultRoute } from '@/app/model/config';

export const redirectToDefaultPageFx = createEffect<Role | void, void>((role) => {
  switch (role) {
    case 'user': {
      defaultRoute.user.open();
      break;
    }
    case 'admin': {
      defaultRoute.admin.open();
      break;
    }
    default: {
      defaultRoute.unauthorized.open();

      // I only use this for TS error, when we have a new role and don't have it in a case of the switch operator
      return role;
    }
  }
});
