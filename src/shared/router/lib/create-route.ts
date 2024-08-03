import { createRoute as _createRoute, RouteInstance, RouteParams } from 'atomic-router';

export interface Route<Params extends RouteParams = RouteParams> {
  instance: RouteInstance<Params>;
  path: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const createRoute = <Params extends RouteParams = {}>(path: string): Route<Params> => {
  return {
    instance: _createRoute<Params>(),
    path,
  };
};
