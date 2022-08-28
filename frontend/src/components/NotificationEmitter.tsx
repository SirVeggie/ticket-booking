import { useNotification } from '../hooks/useNotification';
import { NotificationItem } from './NotificationItem';

export function NotificationEmitter() {
  const { notifications } = useNotification();
  
  return (
    <div>
      {notifications.map(n =>
        <NotificationItem key={n.id} notification={n} />
      )}
    </div>
  );
}