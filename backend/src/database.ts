import { DataPacket, errors, makeId, MiscData, Seats, Show, Showtime, ShowtimeExtra, sumSeats, Ticket } from 'shared';
import { validateShow, validateShowtime, validateTicket } from './tools/dataValidation';
import { ShowModel } from './models/ShowModel';
import { ShowtimeModel } from './models/ShowtimeModel';
import { TicketModel } from './models/TicketModel';

//#region //====| debug data |====//

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

async function reset() {
    await Promise.all([
        ShowModel.deleteMany({}),
        ShowtimeModel.deleteMany({}),
        TicketModel.deleteMany({})
    ]);

    const showIds: string[] = [];
    await Promise.all(createShows().map(async (show, i) => {
        const res = await ShowModel.create(show);
        showIds[i] = res.id;
    }));

    const showtimeIds: string[] = [];
    await Promise.all(createShowtimes(showIds).map(async (showtime, i) => {
        const res = await ShowtimeModel.create(showtime);
        showtimeIds[i] = res.id;
    }));
    
    await Promise.all(createTickets(showtimeIds).map(async ticket => {
        await TicketModel.create(ticket);
    }));
}

function createShows(): Omit<Show, 'id'>[] {
    return [{
        name: 'Ajolähtö',
        description: 'Some dudes try to fix a car or something',
        imageUrl: 'https://i.imgur.com/iT7DGrx.jpg',
        color: '#ffb700'
    },
    {
        name: 'Klovnien valtakunta',
        imageUrl: 'https://cdn.britannica.com/96/198296-050-65D1A810/Clowns-tour-Ringling-Bros-Barnum-Atlanta-2017.jpg',
        color: '#2395c3'
    },
    {
        name: 'Herra hatunnostaja',
        description: 'Some dude lifting hats probably',
        imageUrl: 'https://previews.123rf.com/images/angelnt/angelnt1907/angelnt190700035/128236261-fabulous-circus-man-in-a-hat-and-a-red-suit-posing-in-the-smoke-on-a-colored-dark-background-a-clown.jpg',
        color: '#b991f0'
    }] as Omit<Show, 'id'>[];
}

function createShowtimes(showIds: string[]): Omit<Showtime, 'id'>[] {
    return [{
        showid: makeId(showIds[0]),
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
        showid: makeId(showIds[0]),
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
        showid: makeId(showIds[1]),
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
        showid: makeId(showIds[2]),
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
        showid: makeId(showIds[2]),
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
        showid: makeId(showIds[2]),
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
        showid: makeId(showIds[1]),
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
        showid: makeId(showIds[1]),
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
        showid: makeId(showIds[1]),
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
        showid: makeId(showIds[1]),
        date: new Date(new Date().getTime() + 3600000 * 4),
        location: 'Helsinki, kauppatori',
        maxSeats: 1500,
        prices: {
            normal: 30,
            discount: 15,
            family: 60
        }
    }] as Omit<Showtime, 'id'>[];
}

function createTickets(showtimeIds: string[]): Omit<Ticket, 'id'>[] {
    return [{
        showtimeid: makeId(showtimeIds[0]),
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
        showtimeid: makeId(showtimeIds[1]),
        confirmed: true,
        name: 'Orfeo Llewellyn',
        email: 'some@email.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000001' },
        seats: { normal: 2, discount: 0, family: 0 },
        arrived: true
    },
    {
        showtimeid: makeId(showtimeIds[2]),
        confirmed: true,
        name: 'Minna Pulsa',
        email: 'k.i.rppu@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000002' },
        seats: { normal: 0, discount: 0, family: 1 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[3]),
        confirmed: true,
        name: 'Veikka Pulsa',
        email: 'SirVeggie@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '405030880' },
        seats: { normal: 1, discount: 1, family: 0 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[4]),
        confirmed: true,
        name: 'Orfeo Llewellyn',
        email: 'some@email.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000001' },
        seats: { normal: 2, discount: 0, family: 0 },
        arrived: true
    },
    {
        showtimeid: makeId(showtimeIds[5]),
        confirmed: true,
        name: 'Minna Pulsa',
        email: 'k.i.rppu@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000002' },
        seats: { normal: 0, discount: 0, family: 1 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[6]),
        confirmed: true,
        name: 'Veikka Pulsa',
        email: 'SirVeggie@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '405030880' },
        seats: { normal: 1, discount: 1, family: 0 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[7]),
        confirmed: true,
        name: 'Orfeo Llewellyn',
        email: 'some@email.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000001' },
        seats: { normal: 2, discount: 0, family: 0 },
        arrived: true
    },
    {
        showtimeid: makeId(showtimeIds[8]),
        confirmed: true,
        name: 'Minna Pulsa',
        email: 'k.i.rppu@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000002' },
        seats: { normal: 0, discount: 0, family: 1 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[9]),
        confirmed: true,
        name: 'Veikka Pulsa',
        email: 'SirVeggie@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '405030880' },
        seats: { normal: 1, discount: 1, family: 0 },
        arrived: false
    },
    {
        showtimeid: makeId(showtimeIds[4]),
        confirmed: true,
        name: 'Orfeo Llewellyn',
        email: 'some@email.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000001' },
        seats: { normal: 2, discount: 0, family: 0 },
        arrived: true
    },
    {
        showtimeid: makeId(showtimeIds[5]),
        confirmed: true,
        name: 'Minna Pulsa',
        email: 'k.i.rppu@hotmail.com',
        reserveDate: new Date(),
        phonenumber: { code: '+358', number: '000000002' },
        seats: { normal: 0, discount: 0, family: 1 },
        arrived: false
    }] as Omit<Ticket, 'id'>[];
}
//#endregion

//#region //====| helpers |====//

function error(error: any): never {
    throw error;
}

function mapShowtimeToExtra(tickets: Ticket[]): (st: Showtime) => ShowtimeExtra {
    return (showtime: Showtime) => {
        const reserved = tickets.filter(x => x.showtimeid.toString() === showtime.id).reduce((a, b) => a + sumSeats(b.seats), 0);
        const extra = showtime as ShowtimeExtra;
        extra.reservedSeats = reserved;
        return extra;
    };
}

//#endregion

//#region //====| common |====//

async function getPacket(): Promise<DataPacket> {
    const tickets = await TicketModel.find({});
    const showtimes = await ShowtimeModel.find({});

    return {
        shows: await ShowModel.find({}),
        showtimes: showtimes.map(mapShowtimeToExtra(tickets)),
        misc: misc
    };
}

function getMisc(): MiscData {
    return misc;
}

function replaceMisc(data: MiscData): MiscData {
    misc = data;
    return data;
}

async function getSeatAmounts(): Promise<Record<string, number>> {
    const tickets = await TicketModel.find({});
    const showtimes = await ShowtimeModel.find({});

    const calcAmount = (st: Showtime) => tickets.filter(x => x.showtimeid.toString() === st.id).reduce((sum, t) => sum + sumSeats(t.seats), 0);
    return showtimes.reduce((a, x) => ({ ...a, [x.id]: calcAmount(x) }), {});
}

//#endregion

//#region //====| shows |====//

async function getShows(): Promise<Show[]> {
    return await ShowModel.find({});
}

async function getShowByID(id: string): Promise<Show> {
    return (await ShowModel.findById(id)) ?? error(errors.noData);
}

async function addShow(show: Omit<Show, 'id'>): Promise<Show> {
    show = validateShow(show);
    return await ShowModel.create(show);
}

async function replaceShowByID(id: string, show: Omit<Show, 'id'>): Promise<void> {
    const found = await ShowModel.findById(id);
    if (!found)
        throw errors.noData;
    show = validateShow(show);
    await ShowModel.findByIdAndUpdate(id, show);
}

async function deleteShowByID(id: string): Promise<void> {
    (await ShowtimeModel.find({ showid: id })).forEach(x => deleteShowtimeByID(x.id));
    await ShowModel.findByIdAndDelete(id);
}

//#endregion

//#region //====| showtimes |====//

async function getShowtimes(): Promise<ShowtimeExtra[]> {
    const tickets = await TicketModel.find({});
    const showtimes = await ShowtimeModel.find({});
    return await Promise.all(showtimes.map(mapShowtimeToExtra(tickets)));
}

async function getShowtimeByID(id: string): Promise<ShowtimeExtra> {
    const tickets = await TicketModel.find({ showtimeid: id });
    const showtime = await ShowtimeModel.findById(id);
    if (!showtime)
        throw errors.noData;
    return mapShowtimeToExtra(tickets)(showtime);
}

async function addShowtime(showtime: Omit<Showtime, 'id'>): Promise<ShowtimeExtra> {
    showtime = await validateShowtime(showtime);
    return { ...await ShowtimeModel.create(showtime), reservedSeats: 0 };
}

async function replaceShowtimeByID(id: string, showtime: Omit<Showtime, 'id'>): Promise<void> {
    const found = await ShowtimeModel.findById(id);
    if (!found)
        throw errors.noData;
    showtime = await validateShowtime(showtime);
    await ShowtimeModel.findByIdAndUpdate(id, showtime);
}

async function deleteShowtimeByID(id: string): Promise<void> {
    await TicketModel.deleteMany({ showtimeid: id });
    await ShowtimeModel.findByIdAndDelete(id);
}

async function getAvailableSeats(id: string): Promise<number> {
    const st = await getShowtimeByID(id);
    const tickets = await TicketModel.find({ showtimeid: id });
    return st.maxSeats - tickets.reduce((sum, x) => sum + sumSeats(x.seats), 0);
}

//#endregion

//#region //====| tickets |====//

async function getTickets(): Promise<Ticket[]> {
    return await TicketModel.find({});
}

async function getTicketByID(id: string): Promise<Ticket> {
    return (await TicketModel.findById(id)) ?? error(errors.noData);
}

async function addTicket(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    ticket = await validateTicket(ticket);
    return await TicketModel.create(ticket);
}

async function replaceTicketByID(id: string, ticket: Omit<Ticket, 'id'>): Promise<void> {
    const found = await TicketModel.findById(id);
    if (!found)
        throw errors.noData;
    ticket = await validateTicket(ticket);
    await TicketModel.findByIdAndUpdate(id, ticket);
}

async function deleteTicketByID(id: string): Promise<void> {
    await TicketModel.findByIdAndDelete(id);
}

async function updateTicketSeats(id: string, seats: Seats, admin: boolean): Promise<void> {
    if (seats.discount < 0 || seats.normal < 0 || seats.family < 0)
        throw errors.invalidData;
    const ticket = await getTicketByID(id);
    if (!(admin || sumSeats(seats) <= sumSeats(ticket.seats) + await getAvailableSeats(ticket.showtimeid.toString())))
        throw errors.illegalData;
    ticket.seats = seats;
    await TicketModel.findByIdAndUpdate(id, ticket);
}

//#endregion

//====| export |====//

export default {
    reset,
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
        getSeatAmounts,
        updateSeats: updateTicketSeats
    }
};
