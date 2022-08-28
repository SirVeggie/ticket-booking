import { useHistory } from 'react-router';
import { Button } from 'semantic-ui-react';
import TitleStrip from '../components/TitleStrip';
import Toggle from '../components/Toggle';

function NotFound({ noStrip, noButton }: { noStrip?: boolean, noButton?: boolean; }) {
  const history = useHistory();

  return (
    <div>
      <Toggle enabled={!noStrip}>
        <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Takaisin' onClick={() => history.push('/')} />
      </Toggle>
      <div className='ui container' style={{ margin: 50, paddingLeft: 50 }}>
        <h1>Virhe 404:<br />Sivua ei löydetty</h1>
        <p>Varmista, että osoitteesi on oikein</p>
        <Toggle enabled={!noButton}>
          <Button onClick={() => history.push('/')}>Takaisin lipunvaraukseen</Button>
        </Toggle>
      </div>
    </div>
  );
}

export default NotFound;