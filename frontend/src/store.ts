import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import { DataPacket, Ticket } from 'shared';
import adminReducer, { AdminData } from './reducers/adminReducer';
import dataReducer from './reducers/dataReducer';
import ticketReducer from './reducers/ticketReducer';

const reducer = combineReducers({
    data: dataReducer,
    ticket: ticketReducer,
    admin: adminReducer
});

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
    console.log(store.getState());
});

export interface StateType {
    data: DataPacket,
    ticket: Ticket | null,
    admin: AdminData
}

export default store;