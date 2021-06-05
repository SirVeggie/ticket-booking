import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';

function Showtimes({ shows }: { shows: ShowInfo[]; }) {
  const history = useHistory();
  const params: any = useParams();
  const id = params.id;

  const cards: CardInfo[] = [{
    title: shows[id].title,
    meta: '12.4.2021',
    tags: ['12:30'],
    height: 110
  },
  {
    title: shows[id].title,
    meta: '12.4.2021',
    tags: ['16:00'],
    height: 110
  },
  {
    title: shows[id].title,
    meta: '14.4.2021',
    tags: ['12:00'],
    height: 110
  },
  {
    title: shows[id].title,
    meta: '16.4.2021',
    tags: ['15:30'],
    height: 110
  }];

  return (
    <div>
      <TitleStrip title={shows[id].title} button='Takaisin' onClick={() => history.push('/')} />
      {shows[id].imageUrl ? <Banner src={shows[id].imageUrl!} /> : ''}
      <Description desc={shows[id].description} />
      <Cards title='Näytökset' cards={cards} />
      <Footer />
    </div>
  );
}

function Description({ desc }: { desc: string; }) {
  return (
    <div className='ui container'>
      <h1>Kuvaus</h1>
      <p>{desc}</p>
    </div>
  );
}

export default Showtimes;