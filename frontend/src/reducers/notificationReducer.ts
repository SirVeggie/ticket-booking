
export type NotificationType = 'info' | 'success' | 'error';

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    hidden: boolean;
};

export type NotificationAction = {
    type: 'NOTIFICATION_ADD' | 'NOTIFICATION_REMOVE' | 'NOTIFICATION_CLEAR' | 'NOTIFICATION_HIDE' | 'NOTIFICATION_SHOW';
    data?: Partial<Notification>;
};

const initialState: Notification[] = [];

//====| actions |====//

export function addNotification(notification: Notification): NotificationAction {
    return { type: 'NOTIFICATION_ADD', data: notification };
}

export function removeNotification(id: string): NotificationAction {
    return { type: 'NOTIFICATION_REMOVE', data: { id } };
}

export function clearNotifications(): NotificationAction {
    return { type: 'NOTIFICATION_CLEAR' };
}

export function hideNotification(id: string): NotificationAction {
    return { type: 'NOTIFICATION_HIDE', data: { id } };
}

export function showNotification(id: string): NotificationAction {
    return { type: 'NOTIFICATION_SHOW', data: { id } };
}

//====| reducer |====//

export function notificationReducer(state = initialState, action: NotificationAction) {
    switch (action.type) {
        case 'NOTIFICATION_ADD':
            return [...state, action.data];
        case 'NOTIFICATION_REMOVE':
            return state.filter(n => n.id !== action.data?.id);
        case 'NOTIFICATION_CLEAR':
            return [];
        case 'NOTIFICATION_HIDE':
            return state.map(n => {
                if (n.id === action.data?.id)
                    return { ...n, hidden: true };
                return n;
            });
        case 'NOTIFICATION_SHOW':
            return state.map(n => {
                if (n.id === action.data?.id)
                    return { ...n, hidden: false };
                return n;
            });
        default:
            return state;
    }
}