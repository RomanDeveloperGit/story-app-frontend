import { HTTPError } from 'ky';

export interface ApiError {
  message: string;
  code: string;
}

const EMPTY_API_ERROR = {
  message: '',
  code: '',
};

export const transformToApiError = async (error: unknown): Promise<ApiError> => {
  if (error instanceof HTTPError) {
    try {
      const result: ApiError = await error.response.json();

      return {
        message: result.message || '',
        code: result.code || '',
      };
    } catch (_) {
      return EMPTY_API_ERROR;
    }
  }

  return EMPTY_API_ERROR;
};
