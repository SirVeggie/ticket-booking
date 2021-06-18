import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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
      <h1>{ticket.name}</h1>
    </div>
  );
}

export default TicketDetails;