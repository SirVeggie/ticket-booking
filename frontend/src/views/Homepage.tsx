import React, { useEffect, useState } from 'react';
import '../css/temp.css';
import TitleStrip from '../components/TitleStrip';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import database from '../tools/database';
import { printDate } from '../tools/stringTool';

const cardList: CardInfo[] | undefined = undefined;

function Homepage() {
  const [cards, setCards] = useState(cardList);
  const history = useHistory();

  const opaqueness = '1f';
  const bannerImage = 'https://i.imgur.com/ZeTqEM3.png';

  useEffect(() => {
    database.shows.getall().then(async shows => {
      const showtimes = await database.showtimes.getall();
      
      setCards(shows.map(show => {
        const dates = showtimes.filter(x => x.showid === show.id).map(x => x.date);
        let meta = '';
        
        if (dates.length <= 1) {
          meta = 'Ajankohta: ' + (dates.length === 0 ? 'Ei tulevia näytöksiä' : printDate(dates[0]));
        } else {
          const mindate = dates.reduce((a, b) => a.getTime() <= b.getTime() ? a : b);
          const maxdate = dates.reduce((a, b) => a.getTime() <= b.getTime() ? b : a);
          meta = 'Ajankohta: ' + printDate(mindate) + ' - ' + printDate(maxdate);
        }

        return {
          title: show.name,
          description: show.shortDescription,
          meta: meta,
          imageUrl: show.imageUrl,
          color: show.color?.substr(0, 7) + opaqueness, // remove alpha information from color (if exists) and add own alpha
          action: () => history.push('/show/' + show.id)
        };
      }));
    });
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <Banner src={bannerImage} />
      <Cards title='Esitykset' cards={cards} />
      <Footer />
    </div>
  );
}

export default Homepage;