import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card';
import CardButtons from '../../components/CardButtons';
import { StateType } from '../../store';
import database from '../../tools/database';
import { showMapper } from '../Homepage';

export default function AdminShows() {
  const history = useHistory();
  const { shows, showtimes, misc } = useSelector((state: StateType) => state.data);
  const cards = showMapper(shows, showtimes, misc);
  
  cards.forEach(card => {
    card.action = () => history.push('/admin/show/' + shows.find(x => x.name === card.title)?.id);
  });
  
  const deleteShow = (title: string) => {
    const id = shows.find(x => x.name === title)?.id;
    if (id)
      database.shows.delete(id);
  };

  return (
    <div className='ui container'>
      {!cards ? 'No shows available' : cards.map((card, i) => (
        <Card style={{ marginBottom: 10 }} key={i} data={card} onClick={card.action ?? (() => console.log('Clicked ' + i))}>
          <CardButtons aEdit={() => console.log('Edit pressed')} aHide={() => console.log('Hide pressed')} aDelete={() => deleteShow(card.title)} />
        </Card>
      ))}
    </div>
  );
}
