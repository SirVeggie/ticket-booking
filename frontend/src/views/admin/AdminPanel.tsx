import React, { CSSProperties, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import Align from '../../components/Align';
import { createUseStyles } from 'react-jss';
import AdminAddShow from './AdminAddShow';
import AdminAddShowtime from './AdminAddShowtime';
import AdminShows from './AdminShows';
import AdminTickets from './AdminTickets';
import AdminAddTicket from './AdminAddTicket';
import { useDispatch } from 'react-redux';
import { setLoginStatus, setTicketList } from '../../reducers/adminReducer';
import { lines } from '../../tools/shapes';
import database from '../../tools/database';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import NotFound from '../NotFound';

function AdminPanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    database.tickets.getall().then(tickets => dispatch(setTicketList(tickets)));
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Titlebar />
      <div style={bodyStyle}>
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

function Titlebar() {
  const dispatch = useDispatch();
  const styles = useStyles();

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch(setLoginStatus(false));
  };

  return (
    <div style={titlebar}>
      <div className={styles.logout} onClick={logout}>
        <span style={{ fontSize: 23 }}>
          Logout
        </span>
      </div>
      <div style={titlebarMain}>
        <h1>Admin Panel</h1>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div style={contentStyle}>
      <Switch>
        <Route exact path='/admin'>
          <Redirect to='/admin/shows' />
        </Route>

        <Route path='/admin/shows'>
          <AdminShows />
        </Route>

        <Route path='/admin/tickets'>
          <AdminTickets />
        </Route>

        <Route path='/admin/add_show'>
          <AdminAddShow />
        </Route>

        <Route path='/admin/add_showtime'>
          <AdminAddShowtime />
        </Route>

        <Route path='/admin/add_ticket'>
          <AdminAddTicket />
        </Route>
        
        <Route>
          <NotFound noStrip noButton />
        </Route>
      </Switch>
    </div>
  );
}

function Sidebar() {
  const history = useHistory();
  
  return (
    <div id='AdminSidebar' style={sidebar}>
      <div style={sidebarButtons}>
        <SidebarButton text='Shows' icon='calendar' action={() => history.push('/admin/shows')} />
        <SidebarButton text='Tickets' icon='ticket' action={() => history.push('/admin/tickets')} />
        <SidebarButton text='Add show' icon='plus circle' action={() => history.push('/admin/add_show')} />
        <SidebarButton text='Add showtime' icon='plus circle' action={() => history.push('/admin/add_showtime')} />
        <SidebarButton text='Add ticket' icon='plus circle' action={() => history.push('/admin/add_ticket')} />
      </div>
    </div>
  );
}

function SidebarButton({ text, icon, action }: { text: string, icon: SemanticICONS, action?: () => void; }) {
  const styles = useStyles();

  return (
    <div className={styles.button} onClick={action}>
      <Align left={0} style={{ marginLeft: 10 }}>
        <Icon name={icon} style={{ marginRight: 10 }} />
        <span style={{ fontSize: 16 }}>{text}</span>
      </Align>
    </div>
  );
}

const titlebar: CSSProperties = {
  backgroundColor: '#232333',
  color: '#eeeeee',
  filter: 'drop-shadow(0px 0px 3px #00000099)',
  height: 60,
  display: 'flex'
};

const titlebarMain: CSSProperties = {
  flexGrow: 1,
  paddingLeft: 30,
  borderLeft: '1px solid #00000040',
  display: 'flex',
  alignItems: 'center'
};

const bodyStyle: CSSProperties = {
  display: 'flex',
  height: 'calc(100vh - 60px)'
};

const sidebar: CSSProperties = {
  backgroundColor: '#201C1B',
  width: 150
};

const sidebarButtons: CSSProperties = {

};

const contentStyle: CSSProperties = {
  padding: 30,
  width: 'calc(100vw - 150px)',
  overflow: 'auto'
};

const useStyles = createUseStyles({
  button: {
    height: 50,
    color: '#eeeeee',
    backgroundColor: 'inherit',
    cursor: 'pointer',
    userSelect: 'none',
    borderBottom: 'solid 1px #00000040',
    transition: '0.2s ease',

    '&:hover': {
      backgroundColor: '#00000040'
    },

    '&:active': {
      filter: 'brightness(0.7)',
      transition: '0.1s'
    },
  },

  logout: {
    width: 150,
    color: 'white',
    cursor: 'pointer',
    backgroundColor: 'inherit',
    transition: '0.2s',
    background: lines(-45, '#00000000', '#00000020'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      filter: 'brightness(0.7)'
    }
  }
});

export default AdminPanel;