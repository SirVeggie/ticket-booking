import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Checkbox, Button } from 'semantic-ui-react';
import Card from '../../components/Card';
import { Show, Showtime, sumTickets, Ticket } from 'shared';
import { StateType } from '../../store';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import Toggle from '../../components/Toggle';
import LabelDropdown from '../../components/LabelDropdown';
import CardCheckbox from '../../components/CardCheckbox';
import { setTicketList } from '../../reducers/adminReducer';
import database from '../../tools/database';

export default function AdminTickets() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [search, setSearch] = useState('');
  const [today, setToday] = useState(false);
  const [old, setOld] = useState(false);
  const [show, setShow] = useState<Show>(new Show());
  const [showtime, setShowtime] = useState<Showtime>(new Showtime());

  const updateShow = (x: Show) => {
    setShowtime(new Showtime());
    setShow(x);
  };

  const defShow = { ...new Show(), name: 'All' };
  const defShowtime = new Showtime();
  const showChoices = [defShow, ...shows];
  const stChoices = [defShowtime, ...showtimes.filter(x => x.showid === show.id)];

  return (
    <div className='ui container'>
      <h1>Tickets</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 15 }}>
        <LabelDropdown label='Show' items={showChoices} mapName={x => x.name} update={updateShow} />
        <LabelDropdown label='Showtime' items={stChoices} mapName={getShowtimeText} update={setShowtime} />
      </div>
      <label>Search</label><br />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Input style={{ margin: '0 10px 10px 0', width: 196 }} size='small' value={search} onChange={event => setSearch(event.target.value)} /><br />
        <div style={{ marginBottom: 10 }}>
          <Checkbox disabled={today} label='Include old tickets' checked={old} onChange={() => setOld(!old)} />
          <br />
          <Checkbox label={'Today\'s tickets only'} checked={today} onChange={() => setToday(!today)} />
        </div>
      </div>
      <Results search={search} today={today} old={old} show={show} showtime={showtime} />
    </div>
  );
}

function Results(props: { search: string, today: boolean, old: boolean, show: Show, showtime: Showtime; }) {
  const dispatch = useDispatch();
  const tickets = useSelector((state: StateType) => state.admin.tickets);
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const [limit, setLimit] = useState(10);
  const history = useHistory();

  const filter = (t: Ticket) => {
    const now = new Date();
    const st = showtimes.find(x => x.id === t.showtimeid);
    const hasSelection = props.show.id || props.showtime.id;

    if (!st)
      return false;
    if (props.showtime.id !== '' && props.showtime.id !== st.id)
      return false;
    if (props.show.id !== '' && props.show.id !== st.showid)
      return false;
    if (!props.old && st.date.getTime() + 3600000 * 2 < now.getTime())
      return false;
    if (props.today && (st.date.getDate() !== now.getDate() || st.date.getMonth() !== now.getMonth() || st.date.getFullYear() !== now.getFullYear()))
      return false;
    return (props.search || hasSelection) && match(props.search, t.name, t.email, t.phonenumber.code + t.phonenumber.number);
  };

  const sort = (a: Ticket, b: Ticket) => {
    const dateDif = (showtimes.find(x => x.id === a.showtimeid)?.date.getTime() ?? 0) - (showtimes.find(x => x.id === b.showtimeid)?.date.getTime() ?? 0);
    if (dateDif)
      return dateDif;
    return a.name.localeCompare(b.name);
  };

  const items = tickets.filter(filter).sort(sort);
  const cards = items.slice(0, limit).map(t => {
    const data = mapCard(t, shows, showtimes, history);

    const update = async (value: boolean) => {
      try {
        await database.tickets.replace(t.id, { ...t, arrived: value });
        dispatch(setTicketList(tickets.map(x => x.id !== t.id ? x : { ...x, arrived: value })));
      } catch {
        //
      }
    };

    return (
      <Card key={t.id} data={data} onClick={data.action}>
        <CardCheckbox checked={t.arrived} update={update} />
      </Card>
    );
  });

  const ticketAmount = items.reduce((sum, t) => sum + sumTickets(t.seats), 0);
  const price = items.reduce((sum, t) => {
    const st = showtimes.find(x => x.id === t.showtimeid);
    if (!st)
      return sum;
    return sum + (t.seats.normal * st.prices.normal) + (t.seats.discount * st.prices.discount) + (t.seats.family * st.prices.family);
  }, 0);

  return (
    <div style={{ margin: '30px 0' }}>
      <Toggle enabled={!!cards.length}>
        <span>Tickets selected: {ticketAmount}</span>
        <span style={{ marginLeft: 30 }}>Total price: {price}€</span>
        <div style={{ marginBottom: 10 }} />
      </Toggle>
      <div style={layout}>
        {!cards.length ? 'No matches...' : cards}
      </div>
      <Toggle enabled={items.length > cards.length}>
        <Button onClick={() => setLimit(limit + 10)}>Show more ({items.length - cards.length})</Button>
      </Toggle>
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
      + `Location:  ${showtime?.location}\n\n`
      + (ticket.comment ? `Note: ${ticket.comment}` : '')
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

const layout: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px'
};

function getShowtimeText(st: Showtime): string {
  if (st.id === '')
    return 'All';
  return st.date.toLocaleString().slice(0, -3);
}
