import React from 'react';
import '../css/temp.css';
import TitleStrip from '../components/TitleStrip';
import Banner from '../components/Banner';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { useHistory } from 'react-router-dom';

function Homepage() {
  const history = useHistory();
  
  const opaqueness = '1f';
  const bannerImage = 'https://i.imgur.com/ZeTqEM3.png';
  
  let cards: CardInfo[] = [{
    title: 'Ajolähtö',
    description: 'Tässäpä erittäin hieno kuvaus',
    meta: 'Ajankohta: 12.4.2021 - 24.7.2021',
    imageUrl: 'https://i.imgur.com/iT7DGrx.jpg',
    color: '#ffb700' + opaqueness
  },
  {
    title: 'Klovnien valtakunta',
    meta: 'Ajankohta: 1.3.2022 - 7.5.2022',
    imageUrl: 'https://cdn.britannica.com/96/198296-050-65D1A810/Clowns-tour-Ringling-Bros-Barnum-Atlanta-2017.jpg',
    color: '#2395c3' + opaqueness
  },
  {
    title: 'Herra hatunnostaja',
    meta: 'Ajankohta: 2.10.2022 - 5.1.2023',
    imageUrl: 'https://previews.123rf.com/images/angelnt/angelnt1907/angelnt190700035/128236261-fabulous-circus-man-in-a-hat-and-a-red-suit-posing-in-the-smoke-on-a-colored-dark-background-a-clown.jpg',
    color: '#b991f0' + opaqueness
  }];
  
  cards = cards.map((x, index) => ({ ...x, action: () => history.push('/show/' + index) }));
  
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