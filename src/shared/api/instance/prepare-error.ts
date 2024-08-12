import { HTTPError } from 'ky';

export type PreparedError = HTTPError & {
  response: { parsedError?: unknown };
};

export const prepareError = async (error: HTTPError): Promise<PreparedError> => {
  const preparedError: PreparedError = error;

  try {
    preparedError.response.parsedError = await error.response.json();
  } catch (_) {}

  return preparedError;
};
