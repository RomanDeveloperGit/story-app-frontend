import { FC, ReactNode } from 'react';

import { Footer } from './footer/footer';
import { Header } from './header/header';

import styles from './default-layout.module.css';

interface Props {
  children: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.defaultLayout}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};
