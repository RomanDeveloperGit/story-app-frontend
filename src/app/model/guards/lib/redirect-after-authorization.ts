import { createEffect } from 'effector';

import { Role } from '@/entities/auth';

import { availableRoutes } from '../../config';
import { findRouteWithParsedParamsByPath } from './find-route-with-parsed-params-by-path';
import { openDefaultPageFx } from './open-default-page';
import { VisitData } from './visit-data';

export const redirectAfterAuthorizationFx = createEffect<
  {
    role: Role;
    visitData: VisitData;
  },
  void
>(({ role, visitData }) => {
  if (!visitData) return openDefaultPageFx(role);

  const foundRouteData = findRouteWithParsedParamsByPath(visitData.path, availableRoutes[role]);
  if (!foundRouteData) return openDefaultPageFx(role);

  foundRouteData.route.navigate({
    params: foundRouteData.parsedParams,
    query: visitData.query,
  });
});
