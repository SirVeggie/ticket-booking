import React from 'react';
import '../css/temp.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Card, Image, Segment } from 'semantic-ui-react';
import VCard from '../elements/VCard';

function App() {
  const url = 'https://image.freepik.com/free-vector/blank-circus-border_1308-28544.jpg';

  return (
    <Router>
      <div className='ui container'>
        <h1>YOU SUCK</h1>
        <p>basically youre gay</p>
        <button className='ui yellow basic button'>Muokkaa lippuja</button>
        <VCard />
        <VCard />
        <VCard />
        <VCard />
      </div>
    </Router>
  );
}

export default App;
