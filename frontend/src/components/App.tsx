import React from 'react';
import '../css/temp.css';
import { BrowserRouter as Router } from 'react-router-dom';
import VCard from '../elements/VCard';

function App() {
  const url = 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg';

  const card: CardInfo = {
    title: 'Ajolähtö',
    description: 'Tässäpä erittäin hieno kuvaus',
    meta: '12.4.2021 - 24.7.2021',
    imageUrl: url,
    tags: ['Lapsi 15€', 'Aikuinen 20€']
  };
  
  return (
    <Router>
      <div className='ui container'>
        <h1>Arctic Ensemble Lipunvaraus</h1>
        <h2>Näytökset</h2>
        <VCard data={card} onClick={() => console.log('Clicked ' + card.title)}/>
      </div>
    </Router>
  );
}

export default App;
