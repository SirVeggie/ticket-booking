import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Icon, Message } from 'semantic-ui-react';
import TitleStrip from '../components/TitleStrip';
import Toggle from '../components/Toggle';
import { Ticket } from 'shared';
import database from '../tools/database';

function TicketConfirm() {
  const id = (useParams() as any).id;
  const [ticket, setTicket] = useState(null as Ticket | null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    database.tickets.get(id).then(x => {
      if (!x.confirmed) {
        setTicket(x);
        confirmTicket(id, x);
      } else {
        setMissing(true);
      }
    }).catch(() => {
      setMissing(true);
    });
  }, []);

  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <Container style={{ marginTop: 30 }}>

        <Toggle enabled={!!ticket}>
          <Message icon success>
            <Icon name='check' />
            <Message.Header>Lippusi on nyt varattu onnistuneesti</Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={!ticket && !missing}>
          <Message icon warning>
            <Icon name='circle notch' loading />
            <Message.Header>Odota hetki</Message.Header>
          </Message>
        </Toggle>

        <Toggle enabled={missing}>
          <Message icon error>
            <Icon name='times' />
            <Message.Header>Tämä sivu ei ole käytössä, tarkista sivun osoite</Message.Header>
          </Message>
        </Toggle>

      </Container>
    </div>
  );
}

function confirmTicket(id: string, ticket: Ticket) {
  database.tickets.replace(id, { ...ticket, confirmed: true });
}

export default TicketConfirm;