import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Cards from '../../components/Cards';
import { StateType } from '../../store';
import { showMapper } from '../Homepage';

function AdminShows() {
  const [showid, setShowid] = useState();
  const { shows, showtimes, misc } = useSelector((state: StateType) => state.data);
  const cards = showMapper(shows, showtimes, misc);
  
  return (
    <div>
      <Cards cards={cards} title='Shows' />
    </div>
  );
}

export default AdminShows;