import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Input } from 'semantic-ui-react';
import LabelDropdown from '../../components/LabelDropdown';
import PhoneInput from '../../components/PhoneInput';
import TicketInfo from '../../components/TicketInfo';
import { Show, Showtime, Ticket } from 'shared';
import { setTicketList } from '../../reducers/adminReducer';
import { StateType } from '../../store';
import database from '../../tools/database';
import { useNotification } from '../../hooks/useNotification';

const numbers = Array(201).fill(0).map((_, i) => i);

export default function AdminAddTicket() {
  const notify = useNotification();
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [ticket, setTicket] = useState(new Ticket());
  const [show, setShow] = useState(new Show());
  const dispatch = useDispatch();

  const updateShow = (show: Show) => {
    setTicket({ ...ticket, showtimeid: '' });
    setShow(show);
  };

  const onSave = async () => {
    try {
      const data = { ...ticket, confirmed: true };
      await database.tickets.add(data);
      notify.create('success', 'Ticket added successfully');
      setTicket(new Ticket());
      setShow(new Show());
      dispatch(setTicketList(await database.tickets.getall()));
    } catch (error) {
      console.log('Ticket add failed');
      const message = error instanceof Error ? error.message : error;
      notify.create('error', `Failed to add ticket: ${message}`);
    }
  };

  const temp = showtimes.filter(x => x.showid === show.id);

  return (
    <div className='ui container'>
      <h1>Add ticket</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LabelDropdown label='Show' value={x => x.id === show.id} items={shows} mapName={x => x.name} update={updateShow} width={177} />
        <LabelDropdown label='Showtime' value={x => x.id === ticket.showtimeid} items={temp} mapName={x => getShowtimeText(x)} update={st => setTicket({ ...ticket, showtimeid: st.id })} width={177} />
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
      <Button onClick={onSave} >Save</Button>
      <Divider />
      <h2>Preview</h2>
      <TicketInfo ticket={ticket} />
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
