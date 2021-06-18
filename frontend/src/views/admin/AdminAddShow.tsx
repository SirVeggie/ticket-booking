import React from 'react';
import { Divider } from 'semantic-ui-react';
import VCard from '../../components/VCard';
import { MiscData, Show, Showtime } from '../../datatypes';
import { showMapper } from '../Homepage';

const defaultCard: CardInfo = showMapper([new Show()], [new Showtime()], new MiscData())[0];

function AdminAddShow() {
  const card = defaultCard;
  
  return (
    <div>
      <h1>Add show</h1>
      Some controls here
      <Divider />
      <h2>Card preview</h2>
      <VCard data={card} onClick={() => console.log('clicked card')} />
    </div>
  );
}

export default AdminAddShow;