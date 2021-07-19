import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Input } from 'semantic-ui-react';
import TicketInfo from '../../components/TicketInfo';
import { Ticket } from '../../datatypes';
import { StateType } from '../../store';

export default function AdminAddTicket() {
  const [ticket, setTicket] = useState(new Ticket());
  
  return (
    <div className='ui container'>
      <h1>Add ticket</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <InputField label='Name' update={value => setTicket({ ...ticket, name: value })} />
        <InputField label='Show' update={value => { }} />
        <InputField label='Showtime' update={value => { }} />
        <InputField label='Email' update={value => setTicket({ ...ticket, email: value })} />
        <InputField label='Phonenumber' update={value => { }} />
      </div>
      <h2>Seats</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <InputField label='Normal' update={value => { }} />
        <InputField label='Discount' update={value => { }} />
        <InputField label='Family' update={value => { }} />
      </div>
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
      <Input type={type} error={error} size='small' value={value} onChange={onChange} style={{ margin: '0 10px 10px 0' }} />
    </div>
  );
}

function LabeledDropdown({ label, update }: { label: string, update: (value: any) => void; }) {
  const shows = useSelector((state: StateType) => state.data.shows);
  const options = shows.map(x => ({ key: x.id, value: x.id, text: x.name }));
  
  return (
    <div>
      <label>{label}</label><br />
      <Dropdown search selection compact style={{ width: 177, margin: '0 10px 10px 0' }} options={options} onChange={(event, dropdata) => update(dropdata.value)} />
    </div>
  );
}
