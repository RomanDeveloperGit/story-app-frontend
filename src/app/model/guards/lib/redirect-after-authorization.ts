import { createEffect } from 'effector';

import { Dto } from '@/infrastructure/api';

import { AVAILABLE_ROUTES } from '../../config';
import { findRouteWithParsedParamsByPath } from './find-route-with-parsed-params-by-path';
import { openDefaultPageFx } from './open-default-page';
import { VisitData } from './visit-data';

export const redirectAfterAuthorizationFx = createEffect<
  {
    role: Dto['AuthorizedUser']['role'];
    visitData: VisitData;
  },
  void
>(({ role, visitData }) => {
  if (!visitData) return openDefaultPageFx(role);

  const foundRouteData = findRouteWithParsedParamsByPath(visitData.path, AVAILABLE_ROUTES[role]);
  if (!foundRouteData) return openDefaultPageFx(role);

  foundRouteData.route.navigate({
    params: foundRouteData.parsedParams,
    query: visitData.query,
  });
});
