import { createEffect } from 'effector';

import { Role } from '@/entities/auth';

import { redirectToDefaultPageFx } from '@/app/lib/redirect-to-default-page';

import { availableRoutes } from '../../config';
import { findRouteWithParsedParamsByPath } from './find-route-with-parsed-params-by-path';
import { VisitData } from './visit-data';

export const redirectAfterAuthorizationFx = createEffect<
  {
    role: Role;
    visitData: VisitData;
  },
  void
>(({ role, visitData }) => {
  if (!visitData) return redirectToDefaultPageFx(role);

  const foundRouteData = findRouteWithParsedParamsByPath(visitData.path, availableRoutes[role]);
  if (!foundRouteData) return redirectToDefaultPageFx(role);

  foundRouteData.route.navigate({
    params: foundRouteData.parsedParams,
    query: visitData.query,
  });
});
