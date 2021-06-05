import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Homepage from './views/Homepage';
import Showtimes from './views/Showtimes';
import NotFound from './views/NotFound';
import TicketForm from './views/TicketForm';
import EmailConfirmation from './views/EmailConfirmation';

function App() {
  const shows: ShowInfo[] = [{
    id: 0,
    title: 'Ajolähtö',
    description: 'Some dudes try to fix a car or something',
    imageUrl: 'https://i.imgur.com/iT7DGrx.jpg'
  },
  {
    id: 1,
    title: 'Klovnien valtakunta',
    imageUrl: 'https://cdn.britannica.com/96/198296-050-65D1A810/Clowns-tour-Ringling-Bros-Barnum-Atlanta-2017.jpg'
  },
  {
    id: 2,
    title: 'Herra hatunnostaja',
    description: 'Some dude lifting hats probably',
    imageUrl: 'https://previews.123rf.com/images/angelnt/angelnt1907/angelnt190700035/128236261-fabulous-circus-man-in-a-hat-and-a-red-suit-posing-in-the-smoke-on-a-colored-dark-background-a-clown.jpg'
  }];
  
  const showMatch: any = useRouteMatch('/show/:id');
  const showtimeMatch: any = useRouteMatch('/show/:id/ticket/:showtimeid');
  
  const show = shows.find(x => x.id === Number(showMatch?.params.id));
  const showtime: ShowtimeInfo = {
    id: Number(showtimeMatch?.params.showtimeid ?? 0),
    showid: Number(showMatch?.params.id ?? 0),
    date: new Date(),
    location: 'somewhere'
  };
  
  return (
    <div style={{ minWidth: 500 }}>
      <Switch>
        <Route path='/emailconfirm'>
          <EmailConfirmation />
        </Route>
        <Route path='/show/:id/ticket/:showtimeid'>
          {showtime && show ? <TicketForm showtimeInfo={showtime} /> : <NotFound />}
        </Route>
        <Route path='/show/:id'>
          {show ? <Showtimes show={show} /> : <NotFound />}
        </Route>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
