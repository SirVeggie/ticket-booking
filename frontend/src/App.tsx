import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage';
import Showtimes from './views/Showtimes';
import NotFound from './views/NotFound';
import TicketForm from './views/TicketForm';
import EmailConfirmation from './views/EmailConfirmation';
import CondNotFound from './components/CondNotFound';
import { setData } from './reducers/dataReducer';
import database from './tools/database';
import { useDispatch } from 'react-redux';
import AdminHome from './views/admin/AdminHome';
import TicketDetails from './views/TicketDetails';
import { TicketConfirm } from './views/TicketConfirm';
import auth from './tools/auth';
import { setLoginStatus } from './reducers/adminReducer';
import { NotificationEmitter } from './components/NotificationEmitter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    database.getPacket().then(x => dispatch(setData(x)));
    if (localStorage.getItem('token')) {
      auth.check().then(x => {
        if (!x)
          localStorage.removeItem('token');
        dispatch(setLoginStatus(x));
      });
    }
  }, []);

  return (
    <div style={{ minWidth: 500 }}>
      <NotificationEmitter />
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>

        <Route path='/waiting_confirmation'>
          <EmailConfirmation />
        </Route>

        <Route path='/reserve/:id'>
          <CondNotFound>
            <TicketForm />
          </CondNotFound>
        </Route>

        <Route path='/show/:id'>
          <CondNotFound>
            <Showtimes />
          </CondNotFound>
        </Route>

        <Route path='/ticket/:id'>
          <TicketDetails />
        </Route>

        <Route path='/confirm/:id'>
          <TicketConfirm />
        </Route>

        <Route path='/admin'>
          <AdminHome />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
