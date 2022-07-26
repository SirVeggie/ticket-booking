import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { Ticket } from 'shared';
import { useNotification } from '../hooks/useNotification';
import { StateType } from '../store';
import database from '../tools/database';
import { printDate, printTime } from '../tools/stringTool';
import { ConfirmationModal } from './ConfirmationModal';
import Toggle from './Toggle';

function TicketInfo({ ticket, buttons, style }: { ticket: Ticket, buttons?: boolean, style?: React.CSSProperties; }) {
  const notify = useNotification();
  const history = useHistory();
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [modal, setModal] = useState(false);

  const tickets = (
    <div>
      Perusliput: {ticket.seats.normal}<br />
      alennusliput: {ticket.seats.discount}<br />
      perheliput: {ticket.seats.family}
    </div>
  );

  const showtime = showtimes.find(x => x.id === ticket.showtimeid?.toString());
  const show = shows.find(x => x.id === showtime?.showid?.toString());
  
  const cancelTicket = () => {
    setModal(true);
  };
  
  const onConfirm = (confirm: boolean) => {
    setModal(false);
    if (!confirm) return;
    database.tickets.delete(ticket.id);
    notify.create('success', 'Ticket deleted successfully');
    history.push('/');
  };

  if (!show || !showtime)
    return <Message negative header='Lipputietojen lataus epäonnistui' />;
  return (
    <Segment>
      <div style={{ position: 'relative', ...style }}>
        <ConfirmationModal
          open={modal}
          onInput={onConfirm}
          title='Cancel ticket'
          text='Are you sure you want to cancel this ticket?'
          yesNo
          warning
        />
        
        <Toggle enabled={!!buttons}>
          <Button basic onClick={() => history.push(`/ticket/${ticket.id}/edit`)} style={{ position: 'absolute', right: 0, marginRight: 0 }}>
            <Icon name='edit' />
            Muokkaa
          </Button>

          <Button basic color='red' onClick={cancelTicket} style={{ position: 'absolute', right: 0, bottom: 0, marginRight: 0 }}>
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
          <Toggle enabled={!!ticket.comment}>
            <InfoLine label='Lisätiedot' content={ticket.comment} />
          </Toggle>

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
    <div style={{ marginBottom: 10 }}>
      <b>{label}:</b>
      <br />
      {content}
    </div>
  );
}

export default TicketInfo;