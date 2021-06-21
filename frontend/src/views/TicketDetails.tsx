import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from 'semantic-ui-react';
import TicketInfo from '../components/TicketInfo';
import TitleStrip from '../components/TitleStrip';
import { Ticket } from '../datatypes';
import database from '../tools/database';

function TicketDetails() {
  const [ticket, setTicket] = useState(new Ticket());
  const id = (useParams() as any).id;

  useEffect(() => {
    database.tickets.get(id).then(x => setTicket(x));
  }, []);

  return (
    <div>
      <TitleStrip title='Arctic Ensemble Lipunvaraus' button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <Container style={{ marginTop: 30 }}>
        <TicketInfo ticket={ticket} buttons />
      </Container>
    </div>
  );
}

export default TicketDetails;