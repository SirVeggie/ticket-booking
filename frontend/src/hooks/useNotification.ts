import { useDispatch, useSelector } from 'react-redux';
import { addNotification, clearNotifications, hideNotification, Notification, NotificationType, removeNotification, showNotification } from '../reducers/notificationReducer';
import { StateType } from '../store';
import { uuid } from '../tools/uuid';

export function useNotification() {
    const dispatch = useDispatch();
    const notifications = useSelector((state: StateType) => state.notifications);

    const create = (type: NotificationType, message: string): Notification => {
        const n = {
            id: uuid(),
            type,
            message,
            hidden: true
        };

        dispatch(addNotification(n));

        setTimeout(() => {
            dispatch(showNotification(n.id));
        }, 100);
        
        setTimeout(() => {
            hide(n.id);
        }, 5000);

        return n;
    };

    const remove = (id: string): void => {
        dispatch(removeNotification(id));
    };

    const clear = () => {
        dispatch(clearNotifications());
    };

    const hide = (id: string): void => {
        dispatch(hideNotification(id));
        
        setTimeout(() => {
            remove(id);
        }, 2000);
    };

    return {
        create,
        // remove,
        close: hide,
        clear,
        notifications
    };
}