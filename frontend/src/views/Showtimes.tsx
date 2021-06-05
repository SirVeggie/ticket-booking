import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';

function Showtimes({ show }: { show: ShowInfo; }) {
  const history = useHistory();
  const params: any = useParams();
  const id = params.id;

  const cards: CardInfo[] = [{
    title: show.title,
    meta: '12.4.2021',
    tags: ['12:30', 'Aikuinen 20€', 'Alennus 10€', 'Perhe 50€'],
    height: 110,
    action: () => history.push('/show/' + id + '/ticket/' + 0)
  },
  {
    title: show.title,
    meta: '12.4.2021',
    tags: ['16:00', 'Aikuinen 20€', 'Alennus 10€', 'Perhe 50€'],
    height: 110,
    action: () => history.push('/show/' + id + '/ticket/' + 1)
  },
  {
    title: show.title,
    meta: '14.4.2021',
    tags: ['12:00', 'Aikuinen FREE', 'Alennus FREE', 'Perhe FREE'],
    height: 110,
    action: () => history.push('/show/' + id + '/ticket/' + 2)
  },
  {
    title: show.title,
    meta: '16.4.2021',
    tags: ['15:30', 'Aikuinen 20€', 'Alennus 10€', 'Perhe 50€'],
    height: 110,
    action: () => history.push('/show/' + id + '/ticket/' + 3)
  }];

  return (
    <div>
      <TitleStrip title={show.title} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      {show.imageUrl ? <Banner src={show.imageUrl!} /> : ''}
      <BackButton />
      {show.description ? <Description desc={show.description!} /> : ''}
      <Cards title='Näytökset' cards={cards} />
      <BackButton />
      <Footer />
    </div>
  );
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

export default Showtimes;