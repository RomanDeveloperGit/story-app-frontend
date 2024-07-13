import { createHistoryRouter, redirect } from 'atomic-router';

import { createBrowserHistory } from 'history';

import {
  redirectToLogInPage,
  redirectToMainPage,
  redirectToSignUpPage,
} from '@/layouts/default-layout';

import { logInPageRoute, mainPageRoute, routes, signUpPageRoute } from './routes';

export const router = createHistoryRouter({ routes });

router.setHistory(createBrowserHistory());

// TODO: will think about declaration of redirects in this layer and provide these events in down layers
// Maybe, I can provide it into effector router and use through react bindings...

redirect({
  clock: redirectToMainPage,
  route: mainPageRoute,
});

redirect({
  clock: redirectToLogInPage,
  route: logInPageRoute,
});

redirect({
  clock: redirectToSignUpPage,
  route: signUpPageRoute,
});
