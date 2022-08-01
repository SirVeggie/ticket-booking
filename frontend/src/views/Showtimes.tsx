import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';
import { StateType } from '../store';
import database from '../tools/database';
import Toggle from '../components/Toggle';
import { mapShowtimeCard } from '../tools/maps';
import { BackButton } from '../components/BackButton';

export default function Showtimes() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const history = useHistory();
  const id = (useParams() as any).id;
  const [seatAmounts, setSeatAmounts] = useState<Record<string, number>>({});

  useEffect(() => {
    database.tickets.getSeatAmounts().then(setSeatAmounts);
  }, []);

  const show = shows.find(x => x.id === id);

  if (!show) {
    return null;
  }

  const cards = showtimes
    .filter(st => st.showid === id)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(st => mapShowtimeCard(show.name, st, seatAmounts, history));

  return (
    <div>
      <TitleStrip title={show.name} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      {show.imageUrl ? <Banner src={show.imageUrl!} /> : ''}
      <Toggle enabled={!!show.imageUrl}>
        <BackButton text='Takaisin esityksiin' />
      </Toggle>
      {!show.imageUrl && <br />}
      {show.description ? <Description desc={show.description!} /> : ''}
      <Cards title='Näytökset' cards={cards} emptyText='Ei tulevia näytöksiä' />
      <BackButton text='Takaisin esityksiin' />
      <Footer />
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
