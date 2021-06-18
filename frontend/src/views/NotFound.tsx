import React from 'react';
import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import TitleStrip from '../components/TitleStrip';

function NotFound() {
  const history = useHistory();
  
  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Takaisin' onClick={() => history.push('/')} />
      <div className='ui container' style={{ margin: 50, paddingLeft: 50 }}>
        <h1>Virhe 404:<br />Sivua ei löydetty</h1>
        <p>Varmista, että osoitteesi on oikein</p>
        <Button onClick={() => history.push('/')}>Takaisin lipunvaraukseen</Button>
      </div>
    </div>
  );
}

export default NotFound;