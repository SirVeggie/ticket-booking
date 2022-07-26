import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Icon, Message } from 'semantic-ui-react';
import { Seats, sumSeats, sumTickets, Ticket } from 'shared';
import { StateType } from '../store';
import database from '../tools/database';
import { RePromise } from '../tools/RePromise';
import { ConfirmationModal } from './ConfirmationModal';
import LabelDropdown from './LabelDropdown';
import Toggle from './Toggle';

export default function TicketInfoEdit({ ticket, update }: { ticket: Ticket, update?: (x: Ticket) => void; }) {
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
    const p = RePromise(database.showtimes.getAvailableSeats(ticket.showtimeid?.toString()));
    p.then(x => {
      setAvailable(x);
      setNumbers(Array(Math.max(sumSeats(ticket.seats), admin ? 200 : 50) + 1).fill(0).map((x, i) => i));
    }).catch(e => {
      if (e.canceled)
        return;
      setNumbers([0]);
    });

    return () => p.reject({ canceled: true });
  }, [ticket]);

  const updateSeats = (data: Seats) => {
    setSeats(data);

    if (sumSeats(data) > available + sumSeats(ticket.seats) && sumSeats(data) > sumSeats(ticket.seats)) {
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

    if (!admin && (sumSeats(seats) > available + sumSeats(ticket.seats)) && sumSeats(seats) >= sumSeats(ticket.seats)) {
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
        text='Varmista lippujen oikea määrä'
      >
        <Toggle enabled={!!error}>
          <Message negative>
            <Icon name='warning sign' />
            Huomio: Paikkamäärä ylittyy {sumSeats(seats) - sumSeats(ticket.seats) - available} paikalla
          </Message>
        </Toggle>

        Perusliput: {ticket.seats.normal} {'->'} {seats.normal}<br />
        Alennusliput: {ticket.seats.discount} {'->'} {seats.discount}<br />
        Perheliput: {ticket.seats.family} {'->'} {seats.family}<br />
      </ConfirmationModal>

      <h2>Vaihda varattujen lippujen määrää</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LabelDropdown label='Perusliput' value={x => x === seats.normal} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, normal: x })} />
        <LabelDropdown label='Alennusliput' value={x => x === seats.discount} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, discount: x })} />
        <LabelDropdown label='Perheliput' value={x => x === seats.family} items={numbers} mapName={item => String(item)} update={x => updateSeats({ ...seats, family: x })} />
      </div>

      <Toggle enabled={!!error}>
        <Message negative>
          <Icon name='warning sign' />
          {error}
        </Message>
      </Toggle>

      <Button basic loading={loading} onClick={onSave}>Confirm</Button>
      <Button basic onClick={() => history.push(`/ticket/${ticket.id}`)}>Back</Button>
    </div>
  );
}
