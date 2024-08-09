import ky from 'ky';

import { refreshTokensGuard } from './refresh-token-guard';

export const api = ky.create({
  retry: 0,
  hooks: {
    beforeRequest: [refreshTokensGuard],
  },
});
