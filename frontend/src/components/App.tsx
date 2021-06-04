import React from 'react';
import '../css/temp.css';
import { BrowserRouter as Router } from 'react-router-dom';
import VCard from '../elements/VCard';

function App() {
  const url = 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg';

  const card: CardInfo = {
    title: 'Ajolähtö',
    description: 'Some description',
    meta: '12.4.2021 - 24.7.2021',
    imageUrl: url,
    tags: ['Child 15€', 'Adult 20€']
  };
  
  return (
    <Router>
      <div className='ui container'>
        <h1>YOU SUCK</h1>
        <p>basically youre gay</p>
        <button className='ui yellow basic button'>Muokkaa lippuja</button>
        <VCard data={card} action={() => console.log('Clicked ' + card.title)}/>
      </div>
    </Router>
  );
}

export default App;
