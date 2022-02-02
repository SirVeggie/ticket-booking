import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import CardButtons from '../../components/CardButtons';
import { StateType } from '../../store';
import { showMapper } from '../Homepage';

export default function AdminShows() {
  const { shows, showtimes, misc } = useSelector((state: StateType) => state.data);
  const cards = showMapper(shows, showtimes, misc);

  return (
    <div className='ui container'>
      {!cards ? 'No shows available' : cards.map((card, i) => (
        <Card style={{ marginBottom: 10 }} key={i} data={card} onClick={card.action ?? (() => console.log('Clicked ' + i))}>
          <CardButtons aEdit={() => console.log('Edit pressed')} aHide={() => console.log('Hide pressed')} aDelete={() => console.log('Delete pressed')} />
        </Card>
      ))}
    </div>
  );
}
