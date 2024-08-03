import { FC, ReactNode } from 'react';

import { Text } from '@mantine/core';

import { clsx } from 'clsx';

import styles from './header.module.css';

interface Props {
  children: ReactNode;
  onLogoClick?: () => void;
}

export const Header: FC<Props> = ({ children, onLogoClick }) => {
  return (
    <header className={styles.header}>
      {/* TODO: to create a normal logo */}
      <Text className={clsx({ [styles.cursorPointer]: Boolean(onLogoClick) })} size="lg">
        Story App
      </Text>
      {children}
    </header>
  );
};
