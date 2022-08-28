import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage';
import Showtimes from './views/Showtimes';
import NotFound from './views/NotFound';
import TicketForm from './views/TicketForm';
import EmailConfirmation from './views/EmailConfirmation';
import CondNotFound from './components/CondNotFound';
import AdminHome from './views/admin/AdminHome';
import TicketDetails from './views/TicketDetails';
import { TicketConfirm } from './views/TicketConfirm';
import { NotificationEmitter } from './components/NotificationEmitter';
import { useRefresh } from './hooks/useRefresh';

function App() {
  const { refreshData, refreshAuth, cancelRefresh } = useRefresh();
  
  useEffect(() => {
    refreshData();
    refreshAuth();
    return cancelRefresh;
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
