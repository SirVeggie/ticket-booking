import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Homepage from './views/Homepage';
import Showtimes from './views/Showtimes';

function App() {
  // const location = useLocation();
  
  // useEffect(() => window.scrollTo(0, 0), [location]);
  
  const shows: ShowInfo[] = [{
    title: 'Ajolähtö',
    description: 'Some dudes try to fix a car or something',
    imageUrl: 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg'
  },
  {
    title: 'Klovnien valtakunta',
    description: 'Some dudes spazzing around or who knows',
    imageUrl: 'https://cdn.britannica.com/96/198296-050-65D1A810/Clowns-tour-Ringling-Bros-Barnum-Atlanta-2017.jpg'
  },
  {
    title: 'Herra hatunnostaja',
    description: 'Some dude lifting hats probably',
    imageUrl: 'https://previews.123rf.com/images/angelnt/angelnt1907/angelnt190700035/128236261-fabulous-circus-man-in-a-hat-and-a-red-suit-posing-in-the-smoke-on-a-colored-dark-background-a-clown.jpg'
  }];

  return (
    <Router>
      <Switch>
        <Route path='/show/:id'>
          <Showtimes shows={shows} />
        </Route>
        <Route path='/'>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
