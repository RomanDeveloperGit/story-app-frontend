import { FC, Fragment, ReactNode } from 'react';

import { Button } from '@mantine/core';

import { useUnit } from 'effector-react';

import { $isAuthorized } from '@/entities/auth';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

// TODO: fix!!!
import { openDefaultPageFx } from '@/app/model/guards/lib/open-default-page';

import { logOut } from '../model/log-out';

import styles from './authorized-user-layout.module.css';

interface Props {
  children: ReactNode;
}

export const AuthorizedUserLayout: FC<Props> = ({ children }) => {
  const isAuthorized = useUnit($isAuthorized);
  if (!isAuthorized) return null;

  const redirectToDefaultPage = () => {
    openDefaultPageFx('user');
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
