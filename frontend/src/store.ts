import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import { DataPacket } from './datatypes';
import dataReducer from './reducers/dataReducer';

const reducer = combineReducers({
    data: dataReducer
});

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

export interface StateType {
    data: DataPacket;
}

export default store;