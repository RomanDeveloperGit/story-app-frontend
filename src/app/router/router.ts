import { createHistoryRouter } from 'atomic-router';

import { createBrowserHistory } from 'history';

import { routes } from './routes';

export const router = createHistoryRouter({ routes });

router.setHistory(createBrowserHistory());
