import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import { DataPacket, Ticket } from 'shared';
import { adminReducer, AdminData } from './reducers/adminReducer';
import { dataReducer } from './reducers/dataReducer';
import { Notification, notificationReducer } from './reducers/notificationReducer';
import { ticketReducer } from './reducers/ticketReducer';

const reducer = combineReducers({
    data: dataReducer,
    ticket: ticketReducer,
    admin: adminReducer,
    notifications: notificationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export interface StateType {
    data: DataPacket,
    ticket: Ticket | null,
    admin: AdminData,
    notifications: Notification[]
}

export default store;