import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

export const NotificationManager = () => {
  return <Notifications position="top-right" limit={6} autoClose={5000} zIndex={1000} />;
};
