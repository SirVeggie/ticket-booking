import React from 'react';
import VCard from '../elements/VCard';

function Cards({ title, cards }: { title: string, cards: CardInfo[]; }) {
  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <h1>{title}</h1>
      {cards.map((card, index) => <VCard key={index} data={card} onClick={card.action ?? (() => console.log('Clicked ' + index))} />)}
    </div>
  );
}

export default Cards;