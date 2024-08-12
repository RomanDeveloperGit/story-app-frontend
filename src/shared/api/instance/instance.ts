import ky from 'ky';

import { prepareError } from './prepare-error';
import { refreshTokensGuard } from './refresh-token-guard';

export const api = ky.create({
  retry: 0,
  hooks: {
    beforeRequest: [refreshTokensGuard],
    beforeError: [prepareError],
  },
});
