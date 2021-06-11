import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Input, Dropdown, Button, Icon, Popup, Label, Checkbox, Table, Message } from 'semantic-ui-react';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';
import { printDate, printTime } from '../tools/stringTool';
import { Show, Showtime, Ticket } from '../datatypes';
import { useSelector } from 'react-redux';
import { StateType } from '../store';

function TicketForm() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const id = (useParams() as any).id;

  const showtime = showtimes.find(x => x.id === id);
  const show = shows.find(x => x.id === showtime?.showid);
  
  if (!showtime || !show)
    return null;
  return (
    <div>
      <TitleStrip title={show.name} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <div style={{ height: 50 }} />
      <FormBlock show={show} showtime={showtime} />
      <Footer />
    </div>
  );
}

function FormBlock({ show, showtime }: { show: Show, showtime: Showtime; }) {
  const history = useHistory();

  return (
    <div className='ui container' style={{ marginBottom: 15 }}>
      <h3>Valitun näytöksen tiedot</h3>
      <ActInfo name={show.name} date={showtime.date} location={showtime.location} />

      <Form>
        <div style={{ marginBottom: 20 }}>
          <h3>Lipputiedot</h3>
          <TicketSelector name='Perusliput' price={20} hint='Yli 18 vuotiaat' />
          <TicketSelector name='Alennusliput' price={10} hint='Lapset, opiskelijat, eläkeläiset, toimintarajoitteiset ja toimintarajoitteisten hoitajat' />
          <TicketSelector name='Perheliput' price={40} hint='2 aikuista ja 2 lasta' />
        </div>

        <div style={{ marginBottom: 30 }}>
          <h3>Henkilötiedot</h3>
          <TextInput label='Etunimi' />
          <TextInput label='Sukunimi' />
          <TextInput label='Sähköposti' />
          <TextInput label='Puhelinnumero' extra='- koronatilanteen vuoksi' />
        </div>

        <Notice text={'Tule ajoissa paikalle, noin 1 tunti ennen näytöksen alkamista.'} />

        <div style={{ display: 'flex' }}>
          <Button onClick={() => history.push('/show/' + show.id)}>Takaisin</Button>
          <div style={{ flexGrow: 1 }} />
          <Button color='orange' onClick={() => history.push('/emailconfirm')}>Vahvista</Button>
        </div>
      </Form>
    </div>
  );
}

function TextInput({ label, extra }: { label: string, extra?: string; }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ paddingBottom: 5, fontSize: 15 }}>
        <b>{label}</b> {extra}
      </div>
      <Input size='small' style={{ width: 300 }} />
    </div>
  );
}

function ActInfo({ name, date, location }: { name: string, date: Date, location: string; }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <Table collapsing unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Näytös</Table.HeaderCell>
            <Table.HeaderCell>Päivämäärä</Table.HeaderCell>
            <Table.HeaderCell>Aika</Table.HeaderCell>
            <Table.HeaderCell>Sijainti</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{printDate(date)}</Table.Cell>
            <Table.Cell>{printTime(date)}</Table.Cell>
            <Table.Cell>{location}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

const ticketOptions: any = [];
for (let index = 0; index < 50; index++) {
  ticketOptions.push({ key: index, text: index, value: index });
}

function TicketSelector({ name, price, hint }: { name: string, price: number, hint: string; }) {
  return (
    <div style={{ display: 'inline-block', marginRight: 20, marginBottom: 10 }}>
      <div style={{ paddingBottom: 5, fontSize: 15 }}>
        <b style={{ marginRight: 5 }}>{name}</b>
        <div style={{ display: 'inline', marginRight: 10 }}>
          <Label basic style={{ padding: 4 }}>{price}€</Label>
        </div>
        {!hint ? '' : <div style={{ position: 'relative', top: -1, display: 'inline' }}>
          <Popup
            trigger={<Icon name='question' color='black' size='small' circular />}
            content={hint}
            position='top left'
          />
        </div>}
      </div>
      <Dropdown
        search
        searchInput={{ type: 'number' }}
        selection
        options={ticketOptions}
        placeholder='Määrä'
      />
    </div>
  );
}

function Notice({ text }: { text: string; }) {
  return (
    <Message color='yellow'>
      <Message.Header>Huomio</Message.Header>
      <Message.Content>{text}</Message.Content>
      <div style={{ marginTop: 10 }}>
        <Checkbox label='Ymmärrän' />
      </div>
    </Message>
  );
}

export default TicketForm;