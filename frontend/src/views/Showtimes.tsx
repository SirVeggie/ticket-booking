import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';
import { Show, Showtime } from '../datatypes';
import database from '../tools/database';
import { printDate, printTime } from '../tools/stringTool';

const cardList: CardInfo[] | undefined = undefined;

function Showtimes() {
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(new Show());
  const [cards, setCards] = useState(cardList);
  const history = useHistory();
  const id = (useParams() as any).id;

  useEffect(() => {
    database.shows.get(id).then(async x => {
      setShow(x);
      const showtimes = await database.showtimes.getall();
      setCards(showtimes.filter(st => st.showid === id).map(showtime => {
        return {
          title: x.name,
          meta: printDate(showtime.date),
          tags: showtimeTags(showtime),
          height: 110,
          action: () => history.push('/show/' + id + '/ticket/' + showtime.id)
        };
      }));
    }).catch(() => {
      setValid(false);
    });
  }, []);
  
  if (!valid)
    return null;
  return (
    <div>
      <TitleStrip title={show.name} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      {show.imageUrl ? <Banner src={show.imageUrl!} /> : ''}
      <BackButton />
      {show.description ? <Description desc={show.description!} /> : ''}
      <Cards title='Näytökset' cards={cards} />
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

export default Showtimes;