import React from 'react';
import { Message, Icon, Segment, Header, Loader } from 'semantic-ui-react';
import TitleStrip from '../components/TitleStrip';

function EmailConfirmation() {
  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <div className='ui container' style={{ marginTop: 30 }}>
        <Message color='yellow' style={{ position: 'relative' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1 }}>
              <Message.Header>
                Varmennus viesti lähetetty sähköpostiin
              </Message.Header>
              <Message.Content>
                <div>Odotetaan käyttäjän varmistusta</div>
                <br />
                <div><b>HUOM</b></div>
                <div>Varaus perutaan jos sitä ei varmisteta tunnin sisällä</div>
              </Message.Content>
            </div>
            <Icon size='huge' name='circle notch' loading style={{ margin: 'auto', marginRight: 10 }} />
            {/* <Loader indeterminate inline active size='big' style={{ margin: 'auto', marginRight: 20 }} /> */}
          </div>
        </Message>

        <Segment>
          <Header content='Ticket details' />

        </Segment>
      </div>
    </div>
  );
}

export default EmailConfirmation;