import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Input } from 'semantic-ui-react';
import Card from '../../components/Card';
import LabelDropdown from '../../components/LabelDropdown';
import { makeId, Showtime } from 'shared';
import { setData } from '../../reducers/dataReducer';
import { StateType } from '../../store';
import database from '../../tools/database';
import { useNotification } from '../../hooks/useNotification';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { mapShowtimeCard } from '../../tools/maps';

const defaultDate = new Date(2000, 0, 1, 0, 0);

export default function AdminAddShowtime() {
  const notify = useNotification();
  const dispatch = useDispatch();
  const shows = useSelector((state: StateType) => state.data.shows);
  const [showtime, setShowtime] = useState({ ...new Showtime(), date: defaultDate });
  const [dateError, setDateError] = useState(false);
  const [dateString, setDateString] = useState('');
  const show = shows.find(x => x.id === showtime.showid?.toString());
  const [modal, setModal] = useState(false);

  const parseDate = (value: string) => {
    let data = value.replace(/ +/, ' ').trim().split(' ');
    if (data.length !== 2 || !data.some(x => x.match(/\d+:\d+/)) || !data.some(x => x.match(/(\d{1,2}[./-]){2}\d{4}/))) {
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

  const onSave = () => {
    setModal(true);
  };
  
  const onConfirm = async (confirm: boolean) => {
    setModal(false);
    if (!confirm) return;
    
    if (dateString.length === 0) {
      notify.create('error', 'Date is required');
      return;
    } else if (dateError) {
      notify.create('error', 'Date is invalid');
      return;
    }

    try {
      await database.showtimes.add(showtime);
      notify.create('success', 'Showtime added successfully');
    } catch (error: any) {
      const message = error.error ?? error;
      notify.create('error', message.toString());
      return;
    }

    dispatch(setData(await database.getPacket()));
    setShowtime({ ...new Showtime(), date: defaultDate });
    setDateString('');
  };

  return (
    <div>
      <ConfirmationModal open={modal} onInput={onConfirm} title={'Add a new showtime?'}>
        <Card data={mapShowtimeCard(show?.name ?? '(no show)', showtime, { '': 0 })} style={{ minWidth: 500 }} />
      </ConfirmationModal>
      
      <div className='ui container'>
        <h1>Add showtime</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <LabelDropdown label='Show' value={x => x.id === show?.id} items={shows} mapName={x => x.name} width={177} update={x => setShowtime({ ...showtime, showid: makeId(x.id) })} />
          <InputField label='Location' value={showtime.location} update={value => setShowtime({ ...showtime, location: value })} />
          <InputField label='Date' error={dateError} value={dateString} update={value => { setShowtime({ ...showtime, date: parseDate(value) }); setDateString(value); }} />
          <InputField type='number' label='Max seats' value={String(showtime.maxSeats)} update={value => setShowtime({ ...showtime, maxSeats: Number(value) })} />
          <InputField type='number' label='Normal price' value={String(showtime.prices.normal)} update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, normal: Number(value) } })} />
          <InputField type='number' label='Discount price' value={String(showtime.prices.discount)} update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, discount: Number(value) } })} />
          <InputField type='number' label='Family price' value={String(showtime.prices.family)} update={value => setShowtime({ ...showtime, prices: { ...showtime.prices, family: Number(value) } })} />
        </div>
        <Button onClick={onSave}>Save</Button>
        <Divider />
        <h2>Card preview</h2>
        <Card data={mapShowtimeCard(show?.name ?? '(no show)', showtime, { '': 0 })} />
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
