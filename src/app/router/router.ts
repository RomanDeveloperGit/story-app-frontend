import { createHistoryRouter } from 'atomic-router';

import { createBrowserHistory } from 'history';

import { routeConfigs } from './config';

export const router = createHistoryRouter({ routes: routeConfigs });

router.setHistory(createBrowserHistory());
