import React, { CSSProperties, useState } from 'react';
import { Divider, Icon } from 'semantic-ui-react';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';
import Align from '../../components/Align';
import { createUseStyles } from 'react-jss';
import AdminAddShow from './AdminAddShow';
import ConditionalRender from '../../components/ConditionalRender';
import AdminAddShowtime from './AdminAddShowtime';
import AdminShows from './AdminShows';
import AdminTickets from './AdminTickets';
import AdminAddTicket from './AdminAddTicket';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../../reducers/adminReducer';
import { lines } from '../../tools/shapes';

function AdminPanel() {
  const [page, setPage] = useState(0);

  return (
    <div style={{ height: '100vh' }}>
      <Titlebar />
      <div style={bodyStyle}>
        <Sidebar setPage={setPage} />
        <Content page={page} />
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

function Sidebar({ setPage }: { setPage: (page: number) => void; }) {
  return (
    <div id='AdminSidebar' style={sidebar}>
      <div style={sidebarButtons}>
        <SidebarButton text='Shows' icon='calendar' action={() => setPage(0)} />
        <SidebarButton text='Tickets' icon='ticket' action={() => setPage(1)} />
        <SidebarButton text='Add show' icon='plus circle' action={() => setPage(2)} />
        <SidebarButton text='Add showtime' icon='plus circle' action={() => setPage(3)} />
        <SidebarButton text='Add ticket' icon='plus circle' action={() => setPage(4)} />
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

function Content({ page }: { page: number; }) {
  return (
    <div style={contentStyle}>
      <ConditionalRender index={page}>
        <AdminShows />
        <AdminTickets />
        <AdminAddShow />
        <AdminAddShowtime />
        <AdminAddTicket />
      </ConditionalRender>
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