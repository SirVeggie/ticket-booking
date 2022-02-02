import timer from './tools/timer';
import errors from './tools/errors';
import { DataPacket, MiscData, Seats, Show, Showtime, ShowtimeExtra, Ticket } from './datatypes';
import fixDates from './tools/fixDates';

//====| debug data |====//

//#region debug data
let misc: MiscData = {
    mainBannerUrl: 'https://i.imgur.com/ZeTqEM3.png',
    cardOpacity: '1f',
    homepage: 'https://www.arcticensemble.com/where-are-we',
    explanations: {
        normal: 'Yli 18 vuotiaat',
        discount: 'Lapset, opiskelijat, eläkeläiset, toimintarajoitteiset ja toimintarajoitteisten hoitajat',
        family: '2 aikuista ja 2 lasta'
    }
};

let shows: Show[] = [{
    id: '1',
    name: 'Ajolähtö',
    description: 'Some dudes try to fix a car or something',
    imageUrl: 'https://i.imgur.com/iT7DGrx.jpg',
    color: '#ffb700'
},
{
    id: '2',
    name: 'Klovnien valtakunta',
    imageUrl: 'https://cdn.britannica.com/96/198296-050-65D1A810/Clowns-tour-Ringling-Bros-Barnum-Atlanta-2017.jpg',
    color: '#2395c3'
},
{
    id: '3',
    name: 'Herra hatunnostaja',
    description: 'Some dude lifting hats probably',
    imageUrl: 'https://previews.123rf.com/images/angelnt/angelnt1907/angelnt190700035/128236261-fabulous-circus-man-in-a-hat-and-a-red-suit-posing-in-the-smoke-on-a-colored-dark-background-a-clown.jpg',
    color: '#b991f0'
}];

let showtimes: Showtime[] = [{
    id: '1',
    showid: '1',
    date: new Date(2021, 11, 12, 14, 0),
    location: 'Siilinjärvi, keskusta',
    maxSeats: 100,
    prices: {
        normal: 20,
        discount: 10,
        family: 50
    }
},
{
    id: '2',
    showid: '1',
    date: new Date(2021, 11, 13, 16, 30),
    location: 'Siilinjärvi, keskusta',
    maxSeats: 100,
    prices: {
        normal: 20,
        discount: 10,
        family: 50
    }
},
{
    id: '3',
    showid: '2',
    date: new Date(2022, 6, 20, 12, 30),
    location: 'Kuopio, kuopion tori',
    maxSeats: 200,
    prices: {
        normal: 25,
        discount: 10,
        family: 50
    }
},
{
    id: '4',
    showid: '3',
    date: new Date(2022, 7, 5, 14, 15),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '5',
    showid: '3',
    date: new Date(new Date().getTime() - 86400000),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '6',
    showid: '3',
    date: new Date(new Date().getTime() + 3600000 * 2),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '7',
    showid: '2',
    date: new Date(new Date().getTime() - 86400000 * 2),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '8',
    showid: '2',
    date: new Date(new Date().getTime() + 3600000 * 3),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '9',
    showid: '2',
    date: new Date(new Date().getTime() - 3600000),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
},
{
    id: '10',
    showid: '2',
    date: new Date(new Date().getTime() + 3600000 * 4),
    location: 'Helsinki, kauppatori',
    maxSeats: 1500,
    prices: {
        normal: 30,
        discount: 15,
        family: 60
    }
}];

let tickets: Ticket[] = [{
    id: '1',
    showtimeid: '1',
    confirmed: true,
    name: 'Veikka Pulsa',
    email: 'SirVeggie@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '405030880' },
    seats: { normal: 1, discount: 1, family: 0 },
    arrived: false,
    comment: 'Veikka is epic coder'
},
{
    id: '2',
    showtimeid: '2',
    confirmed: true,
    name: 'Orfeo Llewellyn',
    email: 'some@email.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000001' },
    seats: { normal: 2, discount: 0, family: 0 },
    arrived: true
},
{
    id: '3',
    showtimeid: '3',
    confirmed: true,
    name: 'Minna Pulsa',
    email: 'k.i.rppu@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000002' },
    seats: { normal: 0, discount: 0, family: 1 },
    arrived: false
},
{
    id: '4',
    showtimeid: '4',
    confirmed: true,
    name: 'Veikka Pulsa',
    email: 'SirVeggie@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '405030880' },
    seats: { normal: 1, discount: 1, family: 0 },
    arrived: false
},
{
    id: '5',
    showtimeid: '5',
    confirmed: true,
    name: 'Orfeo Llewellyn',
    email: 'some@email.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000001' },
    seats: { normal: 2, discount: 0, family: 0 },
    arrived: true
},
{
    id: '6',
    showtimeid: '6',
    confirmed: true,
    name: 'Minna Pulsa',
    email: 'k.i.rppu@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000002' },
    seats: { normal: 0, discount: 0, family: 1 },
    arrived: false
},
{
    id: '7',
    showtimeid: '7',
    confirmed: true,
    name: 'Veikka Pulsa',
    email: 'SirVeggie@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '405030880' },
    seats: { normal: 1, discount: 1, family: 0 },
    arrived: false
},
{
    id: '8',
    showtimeid: '8',
    confirmed: true,
    name: 'Orfeo Llewellyn',
    email: 'some@email.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000001' },
    seats: { normal: 2, discount: 0, family: 0 },
    arrived: true
},
{
    id: '9',
    showtimeid: '9',
    confirmed: true,
    name: 'Minna Pulsa',
    email: 'k.i.rppu@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000002' },
    seats: { normal: 0, discount: 0, family: 1 },
    arrived: false
},
{
    id: '10',
    showtimeid: '10',
    confirmed: true,
    name: 'Veikka Pulsa',
    email: 'SirVeggie@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '405030880' },
    seats: { normal: 1, discount: 1, family: 0 },
    arrived: false
},
{
    id: '11',
    showtimeid: '5',
    confirmed: true,
    name: 'Orfeo Llewellyn',
    email: 'some@email.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000001' },
    seats: { normal: 2, discount: 0, family: 0 },
    arrived: true
},
{
    id: '12',
    showtimeid: '6',
    confirmed: true,
    name: 'Minna Pulsa',
    email: 'k.i.rppu@hotmail.com',
    reserveDate: new Date(),
    phonenumber: { code: '+358', number: '000000002' },
    seats: { normal: 0, discount: 0, family: 1 },
    arrived: false
}];
//#endregion

//====| helpers |====//

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

function error(error: any): never {
    throw error;
}

function sumSeats(seats: Seats): number {
    return seats.normal + seats.discount + seats.family;
}

function mapShowtimeToExtra(showtime: Showtime): ShowtimeExtra {
    const reserved = tickets.filter(x => x.showtimeid === showtime.id).reduce((a, b) => a + sumSeats(b.seats), 0);
    return { ...showtime, reservedSeats: reserved };
}

//====| common |====//

async function getPacket(): Promise<DataPacket> {
    await timer(1);
    return { shows: shows, showtimes: showtimes.map(mapShowtimeToExtra), misc: misc };
}

async function getMisc(): Promise<MiscData> {
    await timer(1);
    return misc;
}

async function replaceMisc(data: MiscData): Promise<MiscData> {
    await timer(1);
    misc = data;
    return data;
}

async function getTicketAmounts(): Promise<Record<string, number>> {
    await timer(1);
    const calcAmount = (st: Showtime) => tickets.filter(x => x.showtimeid === st.id).reduce((sum, t) => sum + t.seats.normal + t.seats.discount + t.seats.family, 0);
    return showtimes.reduce((a, x) => ({ ...a, [x.id]: calcAmount(x) }), {});
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
    show = fixDates(show);
    shows.push(show);
    return show;
}

async function replaceShowByID(id: string, show: Show): Promise<void> {
    await timer(1);
    if (!shows.find(x => x.id === id))
        error(errors.noData);
    show.id = id;
    show = fixDates(show);
    shows = shows.map(x => x.id === id ? show : x);
}

async function deleteShowByID(id: string): Promise<void> {
    await timer(1);
    shows = shows.filter(x => x.id === id ? false : true);
}

//====| showtimes |====//

async function getShowtimes(): Promise<ShowtimeExtra[]> {
    await timer(1);
    return showtimes.map(mapShowtimeToExtra);
}

async function getShowtimeByID(id: string): Promise<ShowtimeExtra> {
    await timer(1);
    const showtime = showtimes.find(x => x.id === id);
    if (!showtime)
        throw errors.noData;
    return mapShowtimeToExtra(showtime);
}

async function addShowtime(showtime: Showtime): Promise<ShowtimeExtra> {
    await timer(1);
    showtime.id = generateShowtimeID();
    showtime = fixDates(showtime);
    showtimes.push(showtime);
    return mapShowtimeToExtra(showtime);
}

async function replaceShowtimeByID(id: string, showtime: Showtime): Promise<void> {
    await timer(1);
    if (!showtimes.find(x => x.id === id))
        error(errors.noData);
    showtime.id = id;
    showtime = fixDates(showtime);
    showtimes = showtimes.map(x => x.id === id ? showtime : x);
}

async function deleteShowtimeByID(id: string): Promise<void> {
    await timer(1);
    showtimes = showtimes.filter(x => x.id === id ? false : true);
}

async function getAvailableSeats(id: string): Promise<number> {
    await timer(1);
    const st = showtimes.find(x => x.id === id);
    if (!st)
        error(errors.noData);
    return st.maxSeats - tickets.filter(x => x.showtimeid === st.id).reduce((sum, x) => sum + sumSeats(x.seats), 0);
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
    ticket = fixDates(ticket);
    tickets.push(ticket);
    return ticket;
}

async function replaceTicketByID(id: string, ticket: Ticket): Promise<void> {
    await timer(1);
    if (!tickets.find(x => x.id === id))
        error(errors.noData);
    ticket.id = id;
    ticket = fixDates(ticket);
    tickets = tickets.map(x => x.id === id ? ticket : x);
}

async function deleteTicketByID(id: string): Promise<void> {
    await timer(1);
    tickets = tickets.filter(x => x.id === id ? false : true);
}

async function updateTicketSeats(id: string, seats: Seats, admin: boolean): Promise<void> {
    await timer(1);
    if (seats.discount < 0 || seats.normal < 0 || seats.family < 0)
        error(errors.invalidData);
    const ticket = await getTicketByID(id);
    if (!ticket)
        error(errors.noData);
    if (!(admin || sumSeats(seats) <= sumSeats(ticket.seats) + await getAvailableSeats(ticket.showtimeid)))
        error(errors.illegalData);
    tickets = tickets.map(x => x.id === id ? { ...x, seats: seats } : x);
}

//====| export |====//

export default {
    getPacket,
    getMisc,
    replaceMisc,
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
        replace: replaceShowtimeByID,
        getAvailableSeats: getAvailableSeats
    },
    tickets: {
        getall: getTickets,
        get: getTicketByID,
        add: addTicket,
        delete: deleteTicketByID,
        replace: replaceTicketByID,
        getAmounts: getTicketAmounts,
        updateSeats: updateTicketSeats
    }
};
