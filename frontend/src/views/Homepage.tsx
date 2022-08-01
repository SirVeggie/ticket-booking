import TitleStrip from '../components/TitleStrip';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';
import { printDate } from '../tools/stringTool';
import { MiscData, Show, Showtime } from 'shared';
import { useSelector } from 'react-redux';
import { StateType } from '../store';

function Homepage() {
  const { shows, showtimes, misc } = useSelector((state: StateType) => state.data);
  const history = useHistory();

  const cards: CardInfo[] = showMapper(shows.filter(x => !x.hidden), showtimes, misc, history).map(x => x[1]);
  
  return (
    <div style={{ position: 'relative' }}>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = misc.homepage} />
      <Banner src={misc.mainBannerUrl} />
      <Cards title='Esitykset' cards={cards} emptyText='Ei tulevia esityksiä' />
      <Footer />
    </div>
  );
}

function getShowDates(show: Show, showtimes: Showtime[]): string {
  const dates = showtimes.filter(x => x.showid?.toString() === show.id).map(x => x.date);
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

export function showMapper(shows: Show[], showtimes: Showtime[], misc: MiscData, history?: any): [Show, CardInfo][] {
  return shows.map(show => [show, {
    title: show.name,
    description: show.shortDescription,
    meta: getShowDates(show, showtimes),
    imageUrl: show.imageUrl?.replace(/(?<=imgur.*?)(\.[^.]+)$/, 'm$1'),
    color: show.color?.substr(0, 7) + misc.cardOpacity,
    height: 200,
    action: history ? () => history.push('/show/' + show.id) : undefined
  }]);
}

export default Homepage;