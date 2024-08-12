import { HTTPError } from 'ky';
import { has, isObject, isString } from 'lodash';

import { PreparedError } from '../instance/prepare-error';

type ApiError = PreparedError & {
  response: {
    parsedError: {
      message: string;
      code: string;
    };
  };
};

export const isApiError = (error: unknown): error is ApiError => {
  if (
    error instanceof HTTPError &&
    has(error.response, 'parsedError') &&
    isObject(error.response.parsedError) &&
    has(error.response.parsedError, 'message') &&
    has(error.response.parsedError, 'code') &&
    isString(error.response.parsedError.message) &&
    isString(error.response.parsedError.code)
  ) {
    return true;
  }

  return false;
};
