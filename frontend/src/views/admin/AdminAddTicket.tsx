import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Divider, Input } from 'semantic-ui-react';
import LabelDropdown from '../../components/LabelDropdown';
import PhoneInput from '../../components/PhoneInput';
import TicketInfo from '../../components/TicketInfo';
import { Show, Showtime, Ticket } from '../../datatypes';
import { StateType } from '../../store';
import database from '../../tools/database';

export default function AdminAddTicket() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [ticket, setTicket] = useState(new Ticket());
  const [show, setShow] = useState(new Show());
  
  const updateShow = (show: Show) => {
    setTicket({ ...ticket, showtimeid: '' });
    setShow(show);
  };
  
  const onSave = () => {
    database.tickets.add(ticket);
  };
  
  const temp = showtimes.filter(x => x.showid === show.id);
  
  return (
    <div className='ui container'>
      <h1>Add ticket</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LabelDropdown label='Show' items={shows} mapName={x => x.name} update={updateShow} width={177} />
        <LabelDropdown label='Showtime' items={temp} mapName={x => getShowtimeText(x)} update={st => setTicket({ ...ticket, showtimeid: st.id })} width={177} />
        <InputField label='Name' update={value => setTicket({ ...ticket, name: value })} />
        <InputField label='Email' update={value => setTicket({ ...ticket, email: value })} />
        <PhoneInput data={ticket.phonenumber} setData={data => setTicket({ ...ticket, phonenumber: data })} />
      </div>
      <h2 style={{ marginTop: 0 }}>Seats</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <InputField label='Normal' type='number' update={value => setTicket({ ...ticket, seats: { ...ticket.seats, normal: Number(value) } })} />
        <InputField label='Discount' type='number' update={value => setTicket({ ...ticket, seats: { ...ticket.seats, discount: Number(value) } })} />
        <InputField label='Family' type='number' update={value => setTicket({ ...ticket, seats: { ...ticket.seats, family: Number(value) } })} />
      </div>
      <Button onClick={onSave} >Save</Button>
      <Divider />
      <h2>Preview</h2>
      <TicketInfo ticket={ticket} />
    </div>
  );
}

function InputField({ label, update, type, error }: { label: string, update: (value: string) => void, type?: string, error?: boolean; }) {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    update(event.target.value);
  };

  return (
    <div>
      <label>{label}</label><br />
      <Input type={type} error={error} value={value} onChange={onChange} style={{ margin: '0 10px 10px 0' }} />
    </div>
  );
}

function getShowtimeText(st: Showtime): string {
  return st.date.toLocaleString().slice(0, -3);
}
