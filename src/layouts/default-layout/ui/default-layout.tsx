import { FC, Fragment, ReactNode } from 'react';

import { Button, Text } from '@mantine/core';

import { redirectToLogInPage, redirectToMainPage, redirectToSignUpPage } from '../model/router';

import styles from './default-layout.module.css';

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  const handleRedirectToMainPage = () => {
    redirectToMainPage();
  };

  const handleRedirectToLogInPage = () => {
    redirectToLogInPage();
  };

  const handleRedirectToSignUpPage = () => {
    redirectToSignUpPage();
  };

  return (
    <Fragment>
      <header className={styles.header}>
        <Text className={styles.cursorPointer} size="lg" onClick={handleRedirectToMainPage}>
          Story App
        </Text>
        <div className={styles.buttonBox}>
          <Button onClick={handleRedirectToLogInPage}>Log In</Button>
          <Button onClick={handleRedirectToSignUpPage}>Sign Up</Button>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <Text className={styles.cursorPointer} onClick={handleRedirectToMainPage}>
          Footer, 2024
        </Text>
      </footer>
    </Fragment>
  );
};
