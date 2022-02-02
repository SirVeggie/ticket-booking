import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';
import { Showtime } from '../datatypes';
import { StateType } from '../store';
import { printDate, printTime } from '../tools/stringTool';
import { History } from 'history';
import database from '../tools/database';

export default function Showtimes() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const history = useHistory();
  const id = (useParams() as any).id;
  const [ticAmounts, setTicAmounts] = useState<Record<string, number>>({});

  const show = shows.find(x => x.id === id);

  if (!show) {
    return null;
  }

  const cards = showtimes
    .filter(st => st.showid === id)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(st => mapShowtimeCard(show.name, st, ticAmounts, history));
  
  useEffect(() => {
    database.tickets.getAmounts().then(setTicAmounts);
  }, []);

  return (
    <div>
      <TitleStrip title={show.name} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      {show.imageUrl ? <Banner src={show.imageUrl!} /> : ''}
      <BackButton />
      {show.description ? <Description desc={show.description!} /> : ''}
      <Cards title='Näytökset' cards={cards} emptyText='Ei tulevia näytöksiä' />
      <BackButton />
      <Footer />
    </div>
  );
}

function showtimeTags(showtime: Showtime) {
  return [
    printTime(showtime.date),
    'Peruslippu ' + showtime.prices.normal + '€',
    'Alennuslippu ' + showtime.prices.discount + '€',
    'Perhelippu ' + showtime.prices.family + '€'
  ];
}

function BackButton() {
  const history = useHistory();

  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <Button icon labelPosition='left' onClick={() => history.push('/')}>
        <Icon name='chevron left' />
          Takaisin esityksiin
        </Button>
    </div>
  );
}

function Description({ desc }: { desc: string; }) {
  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <h1>Kuvaus</h1>
      <p>{desc}</p>
    </div>
  );
}

export function mapShowtimeCard(name: string, showtime: Showtime, amounts: Record<string, number>, history?: History): CardInfo {
  const date = printDate(showtime.date);
  const location = (showtime.location ? ' - ' + showtime.location : '');
  const seats = showtime.maxSeats - amounts[showtime.id];
  const seatText = ' - vain ' + seats + (seats === 1 ? ' paikka jäljellä!' : ' paikkaa jäljellä!');
  
  return {
    title: name,
    meta: date + location + (seats && seats <= 10 ? seatText : ''),
    tags: showtimeTags(showtime),
    action: history ? () => history.push('/reserve/' + showtime.id) : undefined,
    disabled: !seats,
    disabledMsg: 'Ei paikkoja jäljellä'
  };
}
