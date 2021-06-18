import React from 'react';
import { Placeholder, Segment } from 'semantic-ui-react';
import VCard from './VCard';
import ConditionalRender from './ConditionalRender';

function Cards({ title, cards }: { title: string, cards: CardInfo[] | undefined; }) {
  const index = cards === undefined ? 0 : (cards.length !== 0 ? 1 : 2);

  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <h1>{title}</h1>
      <ConditionalRender index={index}>
        <LoadingCards />
        <div>{!cards ? 'Error' : cards.map((card, index) => <VCard key={index} data={card} onClick={card.action ?? (() => console.log('Clicked ' + index))} />)}</div>
        <EmptyCards />
      </ConditionalRender>
    </div>
  );
}

function EmptyCards() {
  return (
    <div style={{ textAlign: 'center', fontSize: 20 }}>No content to show</div>
  );
}

function LoadingCards() {
  return (
    <div className='ui container' style={{ marginBottom: 30 }}>
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}

function LoadingCard() {
  return (
    <Segment>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length='medium' />
          <Placeholder.Line length='short' />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  );
}

export default Cards;