import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Dropdown, Input } from 'semantic-ui-react';
import Card from '../../components/Card';
import LabelDropdown from '../../components/LabelDropdown';
import { Showtime } from '../../datatypes';
import { setData } from '../../reducers/dataReducer';
import { StateType } from '../../store';
import database from '../../tools/database';
import { mapShowtimeCard } from '../Showtimes';

const defaultDate = new Date(2000, 0, 1, 0, 0);

export default function AdminAddShowtime() {
  const dispatch = useDispatch();
  const shows = useSelector((state: StateType) => state.data.shows);
  const [showtime, setShowtime] = useState({ ...new Showtime(), date: defaultDate });
  const [dateError, setDateError] = useState(false);
  const show = shows.find(x => x.id === showtime.showid);
  
  const parseDate = (value: string) => {
    let data = value.split(' ');
    if (data.length !== 2) {
      setDateError(true);
      return defaultDate;
    }
    
    setDateError(false);
    if (data[1].includes(':'))
      data = data.reverse();
    const time = data[0].split(':').map(x => Number(x));
    const date = data[1].split(/[./-]/).map(x => Number(x));
    return new Date(date[2], date[1] - 1, date[0], time[0], time[1]);
  };
  
  const onSave = async () => {
    try {
      await database.showtimes.add(showtime);
    } catch {
      return;
    }
    
    dispatch(setData(await database.getPacket()));
    setShowtime({ ...new Showtime(), date: defaultDate });
  };
  
  return (
    <div className='ui container'>
      <h1>Add showtime</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <LabelDropdown label='Show' items={shows} mapName={x => x.name} width={177} update={x => setShowtime({ ...showtime, showid: x.id })} />
        <InputField label='Location' update={value => setShowtime({ ...showtime, location: value })} />
        <InputField label='Date' error={dateError} update={value => setShowtime({ ...showtime, date: parseDate(value) })} />
        <InputField type='number' label='Max seats' update={value => setShowtime({ ...showtime, maxSeats: Number(value) })} />
        <InputField type='number' label='Normal price' update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, normal: Number(value) } })} />
        <InputField type='number' label='Discount price' update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, discount: Number(value) } })} />
        <InputField type='number' label='Family price' update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, family: Number(value) } })} />
      </div>
      <Button onClick={onSave}>Save</Button>
      <Divider />
      <h2>Card preview</h2>
      <Card data={mapShowtimeCard(show?.name ?? '(no show)', showtime)} />
    </div>
  );
}

function InputField({ label, update, type, error }: { label: string, update: (value: string) => void, type?: string, error?: boolean }) {
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
