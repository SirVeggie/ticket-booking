import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Checkbox } from 'semantic-ui-react';
import Card from '../../components/Card';
import { Show, Showtime, Ticket } from '../../datatypes';
import { StateType } from '../../store';
import { History } from 'history';
import { useHistory } from 'react-router-dom';

export default function AdminTickets() {
  const [search, setSearch] = useState('');
  const [today, setToday] = useState(false);
  const [old, setOld] = useState(true);

  return (
    <div className='ui container'>
      <h1>Tickets</h1>
      <label>Search tickets by name, phone, email, etc.</label><br />
      <div style={{ display: 'flex' }}>
        <Input style={{ marginRight: 50 }} size='small' value={search} onChange={event => setSearch(event.target.value)} /><br />
        <div>
          <Checkbox label={'Today\'s tickets only'} checked={today} onChange={() => setToday(!today)} /><br />
          <Checkbox label='Ignore old tickets' checked={old} onChange={() => setOld(!old)} />
        </div>
      </div>
      <Results search={search} />
    </div>
  );
}

function Results({ search }: { search: string; }) {
  const tickets = useSelector((state: StateType) => state.admin.tickets);
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const history = useHistory();
  const filter = (t: Ticket) => search && match(search, t.name, t.email, t.phonenumber.code + t.phonenumber.number);

  const topItems = tickets.filter(filter).slice(0, 10).map(t => {
    const data = mapCard(t, shows, showtimes, history);
    return <Card key={t.id} data={data} onClick={data.action} />;
  });

  return (
    <div style={{ margin: '30px 0' }}>
      {!topItems.length ? 'No matches...' : topItems}
    </div>
  );
}

function mapCard(ticket: Ticket, shows: Show[], showtimes: Showtime[], history: History): CardInfo {
  const showtime = showtimes.find(x => x.id === ticket.showtimeid);
  const show = shows.find(x => x.id === showtime?.showid);

  return {
    title: ticket.name + ' - ' + show?.name,
    meta: `Reserved on:  ${ticket.reserveDate.toLocaleString()}`,
    action: () => history.push('/ticket/' + ticket.id),
    tags: [`Normal: ${ticket.seats.normal}`, `Discount: ${ticket.seats.discount}`, `Family: ${ticket.seats.family}`],
    color: !ticket.confirmed ? 'hsl(35, 100%, 90%)' : undefined,
    description:
      `Phone:  ${ticket.phonenumber.code}${ticket.phonenumber.number}\n`
      + `Email:  ${ticket.email}\n`
      + `Date:  ${showtime?.date.toLocaleString()}\n`
      + `Location:  ${showtime?.location}\n`
  };
}

function match(search: string, ...params: string[]): boolean {
  for (const param of params) {
    if (param.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }
  }

  return false;
}