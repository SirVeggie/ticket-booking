import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage';
import Showtimes from './views/Showtimes';
import NotFound from './views/NotFound';
import TicketForm from './views/TicketForm';
import EmailConfirmation from './views/EmailConfirmation';
import CondNotFound from './components/CondNotFound';

function App() {
  return (
    <div style={{ minWidth: 500 }}>
      <Switch>
        <Route path='/emailconfirm'>
          <EmailConfirmation />
        </Route>
        <Route path='/show/:id/ticket/:showtimeid'>
          <CondNotFound>
            <TicketForm />
          </CondNotFound>
        </Route>
        <Route path='/show/:id'>
          <CondNotFound>
            <Showtimes />
          </CondNotFound>
        </Route>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
