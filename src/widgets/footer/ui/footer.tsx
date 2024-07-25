import { FC } from 'react';

import { Text } from '@mantine/core';

import { clsx } from 'clsx';

import styles from './footer.module.css';

interface Props {
  onTextClick?: () => void;
}

export const Footer: FC<Props> = ({ onTextClick }) => {
  return (
    <footer className={styles.footer}>
      <Text
        className={clsx({ [styles.cursorPointer]: Boolean(onTextClick) })}
        onClick={onTextClick}
      >
        Footer, 2024
      </Text>
    </footer>
  );
};
