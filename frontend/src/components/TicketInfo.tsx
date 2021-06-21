import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Ticket } from '../datatypes';
import { StateType } from '../store';
import { printDate, printTime } from '../tools/stringTool';
import Toggle from './Toggle';

function TicketInfo({ ticket, buttons }: { ticket: Ticket, buttons?: boolean }) {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);

  const tickets = (
    <div>
      Perusliput: {ticket.seats.normal}<br />
      alennusliput: {ticket.seats.discount}<br />
      perheliput: {ticket.seats.family}
    </div>
  );

  const showtime = showtimes.find(x => x.id === ticket.showtimeid);
  const show = shows.find(x => x.id === showtime?.showid);

  if (!show || !showtime)
    return <Message negative header='Lipputietojen lataus epäonnistui' />;
  return (
    <Segment>
      <div style={{ position: 'relative' }}>
        <Toggle enabled={!!buttons}>
          <Button basic style={{ position: 'absolute', right: 0, marginRight: 0 }}>
            <Icon name='edit' />
            Muokkaa
          </Button>

          <Button basic color='red' style={{ position: 'absolute', right: 0, bottom: 0, marginRight: 0 }}>
            <Icon name='times' />
            Peruuta varaus
          </Button>
        </Toggle>

        <div>
          <Header content='Lipputiedot' />
          <InfoLine label='Esitys' content={show.name} />
          <InfoLine label='Ajankohta' content={printTime(showtime.date) + ' - ' + printDate(showtime.date)} />
          <InfoLine label='Sijainti' content={showtime.location} />
          <InfoLine label='Liput' content={tickets} />

          <Header content='Henkilötiedot' />
          <InfoLine label='Nimi' content={ticket.name} />
          <InfoLine label='Sähköposti' content={ticket.email} />
          <InfoLine label='Puhelinnumero' content={ticket.phonenumber.code + ' ' + ticket.phonenumber.number} />
        </div>
      </div>
    </Segment>
  );
}

function InfoLine({ label, content }: { label: string, content: any; }) {
  return (
    <p>
      <b>{label}:</b>
      <br />
      {content}
    </p>
  );
}

export default TicketInfo;