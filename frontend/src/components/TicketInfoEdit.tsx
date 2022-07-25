import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Message } from 'semantic-ui-react';
import { Seats, sumSeats, sumTickets, Ticket } from 'shared';
import { StateType } from '../store';
import database from '../tools/database';
import { ConfirmationModal } from './ConfirmationModal';
import LabelDropdown from './LabelDropdown';
import Toggle from './Toggle';

export default function TicketInfoEdit({ ticket, update }: { ticket: Ticket, update?: (x: Ticket) => void }) {
  const history = useHistory();
  const admin = useSelector((state: StateType) => state.admin.status);
  const [available, setAvailable] = useState(0);
  const [seats, setSeats] = useState(ticket.seats);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [numbers, setNumbers] = useState([0]);
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    if (!ticket.showtimeid)
      return;
    setSeats(ticket.seats);
    database.showtimes.getAvailableSeats(ticket.showtimeid)
      .then(x => {
        setAvailable(x);
        setNumbers(Array(Math.max(sumSeats(ticket.seats), admin ? 200 : 50) + 1).fill(0).map((x, i) => i));
      }).catch(() => setNumbers([0]));
  }, [ticket]);
  
  const updateSeats = (data: Seats) => {
    setSeats(data);
    
    if (sumSeats(data) > available + sumSeats(ticket.seats)) {
      setError(`Ei riittävästi paikkoja vapaana. Paikkamäärä ylittyy ${sumSeats(data) - (sumSeats(ticket.seats) + available)} paikalla.`);
    } else {
      setError('');
    }
  };
  
  const onSave = () => {
    if (sumTickets(seats) === 0) {
      setError('Valitse ainakin yksi lippu');
      return;
    }
    
    if (ticket.seats.normal === seats.normal && ticket.seats.discount === seats.discount && ticket.seats.family === seats.family) {
      setError('Varausta ei ole muutettu');
      return;
    }
    
    if (!admin && sumSeats(seats) > available + sumSeats(ticket.seats)) {
      setError('Valitut liput ylittävät vapaidet paikkojen määrän. Vähennä lippujen määrää.');
      return;
    }
    
    setLoading(true);
    setModal(true);
  };
  
  const onConfirm = async (confirm: boolean) => {
    await onConfirmAction(confirm);
    setLoading(false);
  };
  
  const onConfirmAction = async (confirm: boolean) => {
    setModal(false);
    if (!confirm) return;
    
    try {
      await database.tickets.updateSeats(ticket.id, seats);
      update?.call(null, { ...ticket, seats: seats });
      history.push('/ticket/' + ticket.id);
    } catch {
      setError('Lipun päivitys epäonnistui');
    }
  };
  
  return (
    <div>
      <ConfirmationModal
        open={modal}
        onInput={onConfirm}
        title='Vahvista varauksen päivitys'
        message='Varmista lippujen oikea määrä'
      >
        Perusliput: {ticket.seats.normal} {'->'} {seats.normal}<br />
        Alennusliput: {ticket.seats.discount} {'->'} {seats.discount}<br />
        Perheliput: {ticket.seats.family} {'->'} {seats.family}<br />
      </ConfirmationModal>
      
      <h2>Vaihda varattujen lippujen määrää</h2>
      
      <Toggle enabled={!!error}>
        <Message icon='warning sign' warning size='small' header={error} />
      </Toggle>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LabelDropdown label='Perusliput' value={x => x === seats.normal} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, normal: x })} />
        <LabelDropdown label='Alennusliput' value={x => x === seats.discount} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, discount: x })} />
        <LabelDropdown label='Perheliput' value={x => x === seats.family} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, family: x })} />
      </div>
      
      <Button basic loading={loading} onClick={onSave}>Confirm</Button>
      <Button basic onClick={() => history.push(`/ticket/${ticket.id}`)}>Back</Button>
    </div>
  );
}
