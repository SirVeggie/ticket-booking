import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message, Icon } from 'semantic-ui-react';
import TicketInfo from '../components/TicketInfo';
import TitleStrip from '../components/TitleStrip';
import Toggle from '../components/Toggle';
import { Ticket } from '../datatypes';
import { StateType } from '../store';
import database from '../tools/database';
import NotFound from './NotFound';

function EmailConfirmation() {
  const ticket = useSelector((state: StateType) => state.ticket);
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [confirmed, setConfirmed] = useState(false);

  if (!ticket) {
    return <NotFound />;
  }

  const showtime = showtimes.find(x => x.id === ticket.showtimeid);
  const show = shows.find(x => x.id === showtime?.showid);

  if (!show || !showtime) {
    return <NotFound />;
  }

  useEffect(() => {
    let interval: any = undefined;
    interval = setInterval(async () => {
      let t: Ticket;

      try {
        t = await database.tickets.get(ticket.id);
      } catch {
        return;
      }

      if (!t.confirmed)
        return;
      setConfirmed(true);
      clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <div className='ui container' style={{ marginTop: 30 }}>
        <Toggle enabled={!confirmed}>
          <Message color='yellow' style={{ position: 'relative' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ flexGrow: 1 }}>
                <Message.Header>
                  Varmennus viesti lähetetty sähköpostiin
                </Message.Header>
                <Message.Content>
                  <div>Odotetaan käyttäjän varmistusta</div>
                  <br />
                  <div><b>HUOM</b></div>
                  <div>Varaus perutaan jos sitä ei varmisteta tunnin sisällä</div>
                </Message.Content>
              </div>
              <Icon size='huge' name='circle notch' loading style={{ margin: 'auto', marginRight: 10 }} />
            </div>
          </Message>
        </Toggle>

        <Toggle enabled={!confirmed}>
          <Message icon warning>
            <Icon name='warning sign' />
            <Message.Header>
              Lippuja ei ole varmistettu
            </Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={confirmed}>
          <Message icon success>
            <Icon name='check' />
            <Message.Header>
              Liput on varmistettu
            </Message.Header>
          </Message>
        </Toggle>

        <TicketInfo ticket={ticket} />
      </div>
    </div>
  );
}

export default EmailConfirmation;