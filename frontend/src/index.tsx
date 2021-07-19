import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollFix from './components/ScrollFix';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollFix />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);