import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tempReducer from './reducers/tempReducer';
import 'semantic-ui-css/semantic.min.css';

const reducer = combineReducers({
    temp: tempReducer
});

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

export default store;