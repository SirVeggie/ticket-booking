import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Table, Message, Icon } from 'semantic-ui-react';
import Footer from '../components/Footer';
import TitleStrip from '../components/TitleStrip';
import { printDate, printTime } from '../tools/stringTool';
import { Phonenumber, Show, Showtime, sumTickets, Ticket } from 'shared';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../store';
import { setTicket } from '../reducers/ticketReducer';
import PhoneInput from '../components/PhoneInput';
import TextInput from '../components/TextInput';
import Notice from '../components/Notice';
import validators from '../tools/validators';
import TicketSelector from '../components/TicketInput';
import Toggle from '../components/Toggle';
import database from '../tools/database';

function TicketForm() {
  const { shows, showtimes } = useSelector((state: StateType) => state.data);
  const id = (useParams() as any).id;

  const showtime = showtimes.find(x => x.id === id);
  const show = shows.find(x => x.id === showtime?.showid);

  if (!showtime || !show)
    return null;
  return (
    <div style={{ minWidth: 520 }}>
      <TitleStrip title={show.name} button='Kotisivu' onClick={() => window.location.href = 'https://www.arcticensemble.com/where-are-we'} />
      <div style={{ height: 50 }} />
      <FormBlock show={show} showtime={showtime} />
      <Footer />
    </div>
  );
}

class Errors {
  hasErrors: boolean = false;
  tickets: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  check: string = '';
  server: string = '';
}

function FormBlock({ show, showtime }: { show: Show, showtime: Showtime; }) {
  const initialFormData = new Ticket();
  initialFormData.id = 'null';
  initialFormData.showtimeid = showtime.id;

  const history = useHistory();
  const [data, setData] = useState(initialFormData);
  const [errors, setErrors] = useState(new Errors());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const ticketNormal = 'Yli 18 vuotiaat';
  const ticketDiscount = 'Lapset, opiskelijat, eläkeläiset, toimintarajoitteiset ja toimintarajoitteisten hoitajat';
  const ticketFamily = '2 aikuista ja 2 lasta';
  const changeTickets = (type: string, amount: number) => {
    setData({ ...data, seats: { ...data.seats, [type]: amount } });
    setErrors({ ...errors, tickets: '' });
  };

  const [nameData, setNameData] = useState({ first: '', last: '' });
  const setFirstName = (name: string) => {
    setNameData({ ...nameData, first: name });
    setData({ ...data, name: name + ' ' + nameData.last });
    setErrors({ ...errors, firstname: '' });
  };
  const setLastName = (name: string) => {
    setNameData({ ...nameData, last: name });
    setData({ ...data, name: nameData.first + ' ' + name });
    setErrors({ ...errors, lastname: '' });
  };

  const setEmail = (email: string) => {
    setData({ ...data, email: email });
    setErrors({ ...errors, email: '' });
  };

  const setPhone = (phone: Phonenumber) => {
    setData({ ...data, phonenumber: phone });
    setErrors({ ...errors, phone: '' });
  };

  const [checked, setChecked] = useState(false);
  const check = (check: boolean) => {
    setChecked(check);
    setErrors({ ...errors, check: '' });
  };

  const submit: FormSubmit = async event => {
    event.preventDefault();
    setErrors({ ...errors, server: '' });
    let ticket = { ...data, reserveDate: new Date() };
    console.log('Submitting form:\n' + JSON.stringify(ticket));
    
    const validationErrors = validateForm(data, nameData, checked);
    if (validationErrors.hasErrors) {
      setErrors(validationErrors);
      console.log('Form submit failed due to invalid data');
      return;
    }

    setLoading(true);

    try {
      ticket = await database.tickets.add(ticket);
    } catch (error) {
      console.log('Server failed to handle ticket submit request');
      setErrors({ ...errors, server: 'Häiriö palvelimen kanssa, yritä hetken kuluttua uudelleen' });
      setLoading(false);
      return;
    }

    console.log('Form submit succeeded');
    dispatch(setTicket(ticket));
    history.push('/waiting_confirmation');
  };

  return (
    <div className='ui container' style={{ marginBottom: 15 }}>
      <h3>Valitun näytöksen tiedot</h3>
      <ActInfo name={show.name} date={showtime.date} location={showtime.location} />

      <Form onSubmit={submit}>
        <div style={{ marginBottom: 30 }}>
          <h3>Lipputiedot</h3>

          <Toggle enabled={!!errors.tickets}>
            <div style={{ marginBottom: 15 }}>
              <Message negative compact>
                <Icon name='info circle' />
                {errors.tickets}
              </Message>
            </div>
          </Toggle>

          <TicketSelector name='Perusliput' price={showtime.prices.normal} hint={ticketNormal} data={data.seats.normal} setData={amount => changeTickets('normal', amount)} />
          <TicketSelector name='Alennusliput' price={showtime.prices.discount} hint={ticketDiscount} data={data.seats.discount} setData={amount => changeTickets('discount', amount)} />
          <TicketSelector name='Perheliput' price={showtime.prices.family} hint={ticketFamily} data={data.seats.family} setData={amount => changeTickets('family', amount)} />
          
          <div style={{ marginTop: 10, fontSize: 15 }}>
            Kokonaishinta: {data.seats.normal * showtime.prices.normal + data.seats.discount * showtime.prices.discount + data.seats.family * showtime.prices.family}€
          </div>
        </div>

        <div style={{ marginBottom: 30 }}>
          <h3>Henkilötiedot</h3>
          <TextInput label='Etunimi' data={nameData.first} setData={setFirstName} error={errors.firstname} />
          <TextInput label='Sukunimi' data={nameData.last} setData={setLastName} error={errors.lastname} />
          <TextInput label='Sähköposti' extra=' - varmennusviestiä varten' data={data.email} setData={setEmail} error={errors.email} />
          <PhoneInput data={data.phonenumber} setData={setPhone} error={errors.phone} />
        </div>

        <Notice data={checked} setData={check} error={errors?.check}>
          Tule ajoissa paikalle, noin 1 tunti ennen näytöksen alkamista.
        </Notice>

        <Toggle enabled={!!errors.server}>
          <Message negative>
            <Icon name='warning sign' />
            {errors.server}
          </Message>
        </Toggle>

        <div style={{ display: 'flex' }}>
          <Button onClick={() => history.push('/show/' + show.id)}>Takaisin</Button>
          <div style={{ flexGrow: 1 }} />
          <Button color='orange' type='submit' loading={loading}>Vahvista</Button>
        </div>
      </Form>
    </div>
  );
}

function validateForm(ticket: Ticket, nameData: { first: string, last: string; }, checked: boolean): Errors {
  const errors = new Errors();

  if (sumTickets(ticket.seats) === 0) {
    errors.hasErrors = true;
    errors.tickets = 'Lisää ainakin yksi lippu';
  }

  if (!nameData.first) {
    errors.hasErrors = true;
    errors.firstname = 'Lisää etunimi';
  }

  if (!nameData.last) {
    errors.hasErrors = true;
    errors.lastname = 'Lisää sukunimi';
  }

  if (!validators.email(ticket.email)) {
    errors.hasErrors = true;
    errors.email = 'Viallinen sähköpostiosoite';
  }

  if (ticket.phonenumber.number.length < 3) {
    errors.hasErrors = true;
    errors.phone = 'Viallinen puhelinnumero';
  }

  if (!checked) {
    errors.hasErrors = true;
    errors.check = 'Varmista lukeneesi viesti';
  }

  return errors;
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

export default TicketForm;