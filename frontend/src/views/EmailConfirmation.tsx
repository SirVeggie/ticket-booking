import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import TicketInfo from '../components/TicketInfo';
import TitleStrip from '../components/TitleStrip';
import Toggle from '../components/Toggle';
import { useNotification } from '../hooks/useNotification';
import { StateType } from '../store';
import database from '../tools/database';
import { RePromise } from '../tools/RePromise';
import NotFound from './NotFound';

function EmailConfirmation() {
  const ticket = useSelector((state: StateType) => state.ticket);
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [state, setState] = useState('waiting' as 'waiting' | 'success' | 'timeout' | 'error');
  const notify = useNotification();

  useEffect(() => {
    if (!ticket)
      return;
    const p = RePromise(database.tickets.checkConfirm(ticket.id));
    p.then(() => setState('success'))
      .catch((e) => {
        if (e.canceled)
          return;
        if (e.status === 410) {
          setState('timeout');
        } else {
          setState('error');
          notify.create('error', 'Something went wrong');
        }
      });

    return () => p.reject({ canceled: true });
  }, []);

  if (!ticket) {
    return <NotFound />;
  }

  const showtime = showtimes.find(x => x.id === ticket.showtimeid);
  const show = shows.find(x => x.id === showtime?.showid);

  if (!show || !showtime) {
    return <NotFound />;
  }

  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <div className='ui container' style={{ marginTop: 30 }}>
        <Toggle enabled={state === 'waiting'}>
          <Message color='yellow' style={{ position: 'relative' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                <Message.Header>
                  Varmennus viesti lähetetty sähköpostiin
                </Message.Header>
                <Message.Content>
                  <div>Odotetaan käyttäjän varmistusta, muista katsoa onko viesti mennyt roskapostiin</div>
                  <br />
                  <div><b>HUOM</b></div>
                  <div>Varaus perutaan jos sitä ei varmisteta tunnin sisällä</div>
                </Message.Content>
              </div>
              <Icon size='huge' name='circle notch' loading style={{ margin: 'auto', marginRight: 10 }} />
            </div>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'waiting'}>
          <Message icon warning>
            <Icon name='warning sign' />
            <Message.Header>
              Lippuja ei ole varmistettu
            </Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'success'}>
          <Message icon success>
            <Icon name='check' />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Message.Header>
                Liput on varmistettu
              </Message.Header>
              <Message.Content>
                <div>Linkki varaukseesi on lähetetty sähköpostiin</div><br />
                <div>Varauksen voi peruuttaa tai muokata linkistä</div>
              </Message.Content>
            </div>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'timeout'}>
          <Message icon error>
            <Icon name='warning sign' />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Message.Header>
                Varaus on vanhentunut
              </Message.Header>
              <Message.Content>
                <p>Varausta ei vahvistettu aikarajan sisällä, joten se peruttiin</p>
              </Message.Content>
            </div>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'error'}>
          <Message icon error>
            <Icon name='warning sign' />
            <Message.Header>
              Jokin meni pieleen
            </Message.Header>
          </Message>
        </Toggle>

        <TicketInfo ticket={ticket} />
      </div>
    </div>
  );
}

export default EmailConfirmation;