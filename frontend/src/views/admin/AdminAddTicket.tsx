import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Icon, Input, Message } from 'semantic-ui-react';
import LabelDropdown from '../../components/LabelDropdown';
import PhoneInput from '../../components/PhoneInput';
import TicketInfo from '../../components/TicketInfo';
import { makeId, Show, Showtime, sumSeats, Ticket } from 'shared';
import { setTicketList } from '../../reducers/adminReducer';
import { StateType } from '../../store';
import database from '../../tools/database';
import { useNotification } from '../../hooks/useNotification';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import Toggle from '../../components/Toggle';

const numbers = Array(201).fill(0).map((_, i) => i);

export default function AdminAddTicket() {
  const notify = useNotification();
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [ticket, setTicket] = useState(new Ticket());
  const [show, setShow] = useState(new Show());
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(0);
  
  useEffect(() => {
    if (ticket.showtimeid)
      database.showtimes.getAvailableSeats(ticket.showtimeid.toString())
        .then(setSeatsLeft)
        .catch(err => notify.create('error', err.error ?? 'Failed to get available seats'));
  }, [ticket.showtimeid]);

  const updateShow = (show: Show) => {
    setShow(show);
    setTicket({ ...ticket, showtimeid: null as any });
  };

  const onSave = () => {
    setModal(true);
  };

  const onConfirm = async (confirm: boolean) => {
    setModal(false);
    if (!confirm) return;

    try {
      const data = { ...ticket, confirmed: true };
      await database.tickets.add(data, true);
      notify.create('success', 'Ticket added successfully');
      setTicket(new Ticket());
      setShow(new Show());
      dispatch(setTicketList(await database.tickets.getall()));
    } catch (error: any) {
      console.log('Ticket add failed');
      const message = error.error ?? error;
      notify.create('error', message.toString());
    }
  };

  const temp = showtimes.filter(x => x.showid?.toString() === show.id);

  return (
    <div>
      <ConfirmationModal open={modal} onInput={onConfirm} title={'Add a new ticket?'}>
        <TicketInfo ticket={ticket} style={{ minWidth: 400 }} />
      </ConfirmationModal>

      <div className='ui container'>
        <h1>Add ticket</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <LabelDropdown label='Show' value={x => x.id === show.id} items={shows} mapName={x => x.name} update={updateShow} width={177} />
          <LabelDropdown label='Showtime' value={x => x.id === ticket.showtimeid?.toString()} items={temp} mapName={x => getShowtimeText(x)} update={st => setTicket({ ...ticket, showtimeid: makeId(st.id) })} width={177} />
          <InputField label='Name' value={ticket.name} update={value => setTicket({ ...ticket, name: value })} />
          <InputField label='Email' value={ticket.email} update={value => setTicket({ ...ticket, email: value })} />
          <PhoneInput data={ticket.phonenumber} setData={data => setTicket({ ...ticket, phonenumber: data })} />
        </div>
        <h2 style={{ marginTop: 0 }}>Seats</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <LabelDropdown label='Normal' value={x => x === ticket.seats.normal} items={numbers} mapName={item => String(item)} update={x => setTicket({ ...ticket, seats: { ...ticket.seats, normal: Number(x) } })} />
          <LabelDropdown label='Discount' value={x => x === ticket.seats.discount} items={numbers} mapName={item => String(item)} update={x => setTicket({ ...ticket, seats: { ...ticket.seats, discount: Number(x) } })} />
          <LabelDropdown label='Family' value={x => x === ticket.seats.family} items={numbers} mapName={item => String(item)} update={x => setTicket({ ...ticket, seats: { ...ticket.seats, family: Number(x) } })} />
        </div>
        
        <Toggle enabled={sumSeats(ticket.seats) > seatsLeft}>
          <Message negative>
            <Icon name='warning sign' />
            You have selected more seats than are available by {sumSeats(ticket.seats) - seatsLeft}
          </Message>
        </Toggle>
        
        <Button onClick={onSave} >Save</Button>
        <Divider />
        <h2>Preview</h2>
        <TicketInfo ticket={ticket} />
      </div>
    </div>
  );
}

function InputField({ label, value, update, type, error }: { label: string, value: string | undefined, update: (value: string) => void, type?: string, error?: boolean; }) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    update(event.target.value);
  };

  return (
    <div>
      <label>{label}</label><br />
      <Input type={type} error={error} value={value ?? ''} onChange={onChange} style={{ margin: '0 10px 10px 0' }} />
    </div>
  );
}

function getShowtimeText(st: Showtime): string {
  return st.date.toLocaleString().slice(0, -3);
}
