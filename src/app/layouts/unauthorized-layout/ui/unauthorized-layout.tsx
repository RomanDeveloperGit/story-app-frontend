import { FC, Fragment, ReactNode } from 'react';

import { Button } from '@mantine/core';

import { useUnit } from 'effector-react';

import { logInPageRoute, signUpPageRoute } from '@/infrastructure/routes';

import { $isAuthorized } from '@/entities/auth';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import styles from './unauthorized-layout.module.css';

interface Props {
  children: ReactNode;
}

export const UnauthorizedLayout: FC<Props> = ({ children }) => {
  const isAuthorized = useUnit($isAuthorized);
  if (isAuthorized) return null;

  const redirectToLogInPage = () => {
    logInPageRoute.open();
  };

  const redirectToSignUpPage = () => {
    signUpPageRoute.open();
  };

  return (
    <Fragment>
      <Header>
        <div className={styles.buttonBox}>
          <Button onClick={redirectToLogInPage}>Log In</Button>
          <Button onClick={redirectToSignUpPage}>Sign Up</Button>
        </div>
      </Header>
      <main className={styles.main}>{children}</main>
      <Footer />
    </Fragment>
  );
};
