import { FC, Fragment, ReactNode, useMemo } from 'react';

import { Button } from '@mantine/core';

import { useUnit } from 'effector-react';

import { getRouteInstance, logInRoute, signUpRoute } from '@/shared/router';

import { $isAuthorized } from '@/entities/auth';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { logInFx } from '@/pages/log-in';
import { signUpFx } from '@/pages/sign-up';

import styles from './unauthorized-layout.module.css';

interface Props {
  children: ReactNode;
}

export const UnauthorizedLayout: FC<Props> = ({ children }) => {
  const [isAuthorized, isLogInPending, isSignUpPending] = useUnit([
    $isAuthorized,
    logInFx.pending,
    signUpFx.pending,
  ]);

  const isAuthPending = useMemo(
    () => isLogInPending || isSignUpPending,
    [isLogInPending, isSignUpPending],
  );

  if (isAuthorized) return null;

  const redirectToLogInPage = () => {
    getRouteInstance(logInRoute).open();
  };

  const redirectToSignUpPage = () => {
    getRouteInstance(signUpRoute).open();
  };

  return (
    <Fragment>
      <Header>
        <div className={styles.buttonBox}>
          <Button onClick={redirectToLogInPage} disabled={isAuthPending}>
            Log In
          </Button>
          <Button onClick={redirectToSignUpPage} disabled={isAuthPending}>
            Sign Up
          </Button>
        </div>
      </Header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </Fragment>
  );
};
