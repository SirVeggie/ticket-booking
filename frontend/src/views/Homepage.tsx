import React from 'react';
import '../css/temp.css';
import TitleStrip from '../components/TitleStrip';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { printDate } from '../tools/stringTool';
import { Show, Showtime } from '../datatypes';
import { useSelector } from 'react-redux';
import { StateType } from '../store';

const opaqueness = '1f';
const bannerImage = 'https://i.imgur.com/ZeTqEM3.png';

function Homepage() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const history = useHistory();

  const cards: CardInfo[] = shows.map(show => ({
    title: show.name,
    description: show.shortDescription,
    meta: getShowDates(show, showtimes),
    imageUrl: show.imageUrl?.replace(/(?<=imgur.*?)(\.[^.]+)$/, 'm$1'),
    color: show.color?.substr(0, 7) + opaqueness,
    action: () => history.push('/show/' + show.id)
  }));

  return (
    <div style={{ position: 'relative' }}>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <Banner src={bannerImage} />
      <Cards title='Esitykset' cards={cards} />
      <Footer />
    </div>
  );
}

function getShowDates(show: Show, showtimes: Showtime[]): string {
  const dates = showtimes.filter(x => x.showid === show.id).map(x => x.date);
  let meta = '';

  if (dates.length <= 1) {
    meta = 'Ajankohta: ' + (dates.length === 0 ? 'Ei tulevia näytöksiä' : printDate(dates[0]));
  } else {
    const mindate = dates.reduce((a, b) => a.getTime() <= b.getTime() ? a : b);
    const maxdate = dates.reduce((a, b) => a.getTime() <= b.getTime() ? b : a);
    meta = 'Ajankohta: ' + printDate(mindate) + ' - ' + printDate(maxdate);
  }
  
  return meta;
}

export default Homepage;