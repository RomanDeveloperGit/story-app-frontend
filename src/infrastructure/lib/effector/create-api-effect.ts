import { createEffect } from 'effector';

import { ApiError, transformToApiError } from '@/infrastructure/api';

export const createApiEffect = <Params, Done>(handler: (params: Params) => Promise<Done>) => {
  return createEffect<Params, Done, ApiError>(async (params) => {
    try {
      return await handler(params);
    } catch (error) {
      const transformedError = await transformToApiError(error);

      console.error('Error before transformation to api error\n', {
        error,
        transformedError,
      });

      throw transformedError;
    }
  });
};
