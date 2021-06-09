import timer from './tools/timer';
import errors from './tools/errors';

let shows: Show[] = [{
    id: '1',
    name: 'Ajolähtö'
}];

let showtimes: Showtime[] = [{
    id: '1',
    showid: '1',
    date: new Date(),
    location: 'Siilinjärvi, keskusta'
}];

let tickets: Ticket[] = [{
    id: '1',
    showtimeid: '1',
    confirmed: true,
    name: 'Veikka Pulsa',
    email: 'SirVeggie@hotmail.com',
    phonenumber: { countrycode: 358, number: '405030880' },
    seats: { normal: 1, discount: 1, family: 0 }
}];

function generateShowID(): string {
    let id = '0';
    while (shows.find(x => x.id === id)) {
        id = Math.floor((Math.random() * 1000000000)).toString();
    }
    return id;
}

function generateShowtimeID(): string {
    let id = '0';
    while (showtimes.find(x => x.id === id)) {
        id = Math.floor((Math.random() * 1000000000)).toString();
    }
    return id;
}

function generateTicketID(): string {
    let id = '0';
    while (tickets.find(x => x.id === id)) {
        id = Math.floor((Math.random() * 1000000000)).toString();
    }
    return id;
}

function error(error: any): any {
    throw error;
}

//====| shows |====//

async function getShows(): Promise<Show[]> {
    await timer(1);
    return shows;
}

async function getShowByID(id: string): Promise<Show> {
    await timer(1);
    return shows.find(x => x.id === id) ?? error(errors.noData);
}

async function addShow(show: Show): Promise<Show> {
    await timer(1);
    show.id = generateShowID();
    shows.push(show);
    return show;
}

async function replaceShowByID(id: string, show: Show): Promise<void> {
    await timer(1);
    if (!shows.find(x => x.id === id))
        error(errors.noData);
    show.id = id;
    shows = shows.map(x => x.id === id ? show : x);
}

async function deleteShowByID(id: string): Promise<void> {
    await timer(1);
    shows = shows.filter(x => x.id === id ? false : true);
}

//====| showtimes |====//

async function getShowtimes(): Promise<Showtime[]> {
    await timer(1);
    return showtimes;
}

async function getShowtimeByID(id: string): Promise<Showtime> {
    await timer(1);
    return showtimes.find(x => x.id === id) ?? error(errors.noData);
}

async function addShowtime(showtime: Showtime): Promise<Showtime> {
    await timer(1);
    showtime.id = generateShowtimeID();
    showtimes.push(showtime);
    return showtime;
}

async function replaceShowtimeByID(id: string, showtime: Showtime): Promise<void> {
    await timer(1);
    if (!showtimes.find(x => x.id === id))
        error(errors.noData);
    showtime.id = id;
    showtimes = showtimes.map(x => x.id === id ? showtime : x);
}

async function deleteShowtimeByID(id: string): Promise<void> {
    await timer(1);
    showtimes = showtimes.filter(x => x.id === id ? false : true);
}

//====| tickets |====//

async function getTickets(): Promise<Ticket[]> {
    await timer(1);
    return tickets;
}

async function getTicketByID(id: string): Promise<Ticket> {
    await timer(1);
    return tickets.find(x => x.id === id) ?? error(errors.noData);
}

async function addTicket(ticket: Ticket): Promise<Ticket> {
    await timer(1);
    ticket.id = generateTicketID();
    tickets.push(ticket);
    return ticket;
}

async function replaceTicketByID(id: string, ticket: Ticket): Promise<void> {
    await timer(1);
    if (!tickets.find(x => x.id === id))
        error(errors.noData);
    ticket.id = id;
    tickets = tickets.map(x => x.id === id ? ticket : x);
}

async function deleteTicketByID(id: string): Promise<void> {
    await timer(1);
    tickets = tickets.filter(x => x.id === id ? false : true);
}

//====| export |====//

export default {
    shows: {
        getall: getShows,
        get: getShowByID,
        add: addShow,
        delete: deleteShowByID,
        replace: replaceShowByID
    },
    showtimes: {
        getall: getShowtimes,
        get: getShowtimeByID,
        add: addShowtime,
        delete: deleteShowtimeByID,
        replace: replaceShowtimeByID
    },
    tickets: {
        getall: getTickets,
        get: getTicketByID,
        add: addTicket,
        delete: deleteTicketByID,
        replace: replaceTicketByID
    }
};
