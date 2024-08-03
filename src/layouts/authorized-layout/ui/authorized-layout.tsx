import { FC, Fragment, ReactNode } from 'react';

import { Button } from '@mantine/core';

import { useUnit } from 'effector-react';

import { DEFAULT_ROUTE, getRouteInstance } from '@/infrastructure/router';

import { $isAuthorized } from '@/entities/auth';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { logOut } from '../model/log-out';

import styles from './authorized-layout.module.css';

interface Props {
  children: ReactNode;
}

export const AuthorizedLayout: FC<Props> = ({ children }) => {
  const isAuthorized = useUnit($isAuthorized);
  if (!isAuthorized) return null;

  const redirectToDefaultPage = () => {
    getRouteInstance(DEFAULT_ROUTE.USER).open();
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <Fragment>
      <Header onLogoClick={redirectToDefaultPage}>
        {/* TODO: to move this in a profile page, later */}
        <Button className={styles.headerButton} onClick={handleLogOut}>
          Log Out
        </Button>
      </Header>
      <main className={styles.main}>{children}</main>
      <Footer onTextClick={redirectToDefaultPage} />
    </Fragment>
  );
};
