import React from 'react';
import { useHistory } from 'react-router-dom';
import VCard from '../elements/VCard';

function Cards({ title, cards }: { title: string, cards: CardInfo[]; }) {
  const history = useHistory();
  
  return (
    <div className='ui container'>
      <div style={{ height: '20px' }} />
      <h1>{title}</h1>
      {cards.map((card, index) => <VCard key={index} data={card} onClick={() => history.push('/show/' + index)} />)}
    </div>
  );
}

export default Cards;