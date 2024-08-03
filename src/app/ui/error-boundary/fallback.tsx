import { FC } from 'react';

import { Alert } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';

export const Fallback: FC = () => {
  return (
    <Alert title="Something went wrong" color="red" icon={<IconExclamationCircle />}>
      An unexpected error
    </Alert>
  );
};
