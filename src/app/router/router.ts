import { createHistoryRouter } from 'atomic-router';

import { createBrowserHistory } from 'history';

import { ROUTE_CONFIGS } from './config';

export const router = createHistoryRouter({ routes: ROUTE_CONFIGS });

router.setHistory(createBrowserHistory());
