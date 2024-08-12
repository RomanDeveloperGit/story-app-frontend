import { showNotification } from '@mantine/notifications';

import { createEffect } from 'effector';

type FullNotificationData = Parameters<typeof showNotification>[0];
type ShortNotificationData = Pick<FullNotificationData, 'title' | 'message'>;

export const showNotificationFx = createEffect<FullNotificationData, void>((notificationData) => {
  showNotification(notificationData);
});

export const showSuccessNotificationFx = createEffect<ShortNotificationData, void>(
  (notificationData) => {
    showNotification({
      ...notificationData,
      color: 'green',
    });
  },
);

export const showErrorNotificationFx = createEffect<ShortNotificationData, void>(
  (notificationData) => {
    showNotification({
      ...notificationData,
      color: 'red',
    });
  },
);

export const showDefaultErrorNotificationFx = createEffect<ShortNotificationData, void>(
  (notificationData) => {
    showNotification({
      ...notificationData,
      message: 'Something went wrong',
      color: 'red',
    });
  },
);
