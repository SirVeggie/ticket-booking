import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Icon, Message } from 'semantic-ui-react';
import TitleStrip from '../components/TitleStrip';
import Toggle from '../components/Toggle';
import { useNotification } from '../hooks/useNotification';
import database from '../tools/database';

export function TicketConfirm() {
  const id = (useParams() as any).id;
  const [state, setState] = useState('waiting' as 'waiting' | 'confirmed' | 'missing');
  const notify = useNotification();

  useEffect(() => {
    database.tickets.confirm(id)
      .then(() => setState('confirmed'))
      .catch(error => {
        if (error.status === 410 || error.status === 404)
          setState('missing');
        else
          notify.create('error', 'Something went wrong');
      });
  }, []);

  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <Container style={{ marginTop: 30 }}>

        <Toggle enabled={state === 'confirmed'}>
          <Message icon success>
            <Icon name='check' />
            <Message.Header>Lippusi on nyt varattu onnistuneesti</Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'waiting'}>
          <Message icon warning>
            <Icon name='circle notch' loading />
            <Message.Header>Odota hetki</Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={state === 'missing'}>
          <Message icon error>
            <Icon name='times' />
            <Message.Header>Tämä sivu ei ole käytössä, tarkista sivun osoite</Message.Header>
          </Message>
        </Toggle>

      </Container>
    </div>
  );
}
