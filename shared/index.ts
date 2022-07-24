
export const errors = {
    noData: new Error('Data not found'),
    invalidData: new Error('Object contains invalid data'),
    illegalData: new Error('Data was recognized, but was discarded'),
    noAdmin: new Error('Invalid admin token'),
    invalidIP: new Error('Token ip did not match'),
    tokenExpire: new Error('Token has expired')
};

export class MiscData {
    mainBannerUrl: string = '';
    cardOpacity: string = '1f';
    homepage: string = '';
    explanations: TicketExplanations = new TicketExplanations();
}

export class TicketExplanations {
    normal: string = 'Peruslippu';
    discount: string = 'Alennuslippu';
    family: string = 'Perhelippu';
}

export class Show {
    id: string = '';
    name: string = '';
    description?: string = '';
    shortDescription?: string = '';
    color?: string = undefined;
    imageUrl?: string = undefined;
}

export class Showtime {
    id: string = '';
    showid: string = '';
    date: Date = new Date();
    location: string = '';
    maxSeats: number = 0;
    prices: Prices = new Prices();
}

export class ShowtimeExtra extends Showtime {
    reservedSeats: number = 0;
}

export class DataPacket {
    misc: MiscData = new MiscData();
    shows: Show[] = [];
    showtimes: ShowtimeExtra[] = [];
}

export class Ticket {
    id: string = '';
    showtimeid: string = '';
    confirmed: boolean = false;
    name: string = '';
    email: string = '';
    reserveDate: Date = new Date();
    phonenumber: Phonenumber = new Phonenumber();
    seats: Seats = new Seats();
    arrived: boolean = false;
    comment?: string = undefined;
}

export class Phonenumber {
    code: string = '+00';
    number: string = '';
}

export class Seats {
    normal: number = 0;
    discount: number = 0;
    family: number = 0;
}

export class Prices {
    normal: number = 0;
    discount: number = 0;
    family: number = 0;
}

export class TicketInfo {
    max: number = 0;
    reserved: number = 0;
}

//==| models |==//

export const showModel: Show = new Show();
export const showtimeModel: Showtime = new Showtime();
export const ticketModel: Ticket = new Ticket();

//==| routes |==//

export const apiPath = '/api' as const;
export const showPath = `${apiPath}/shows` as const;
export const showtimePath = `${apiPath}/showtimes` as const;
export const ticketPath = `${apiPath}/tickets` as const;

//==| functions |==//

export function sumSeats(seats: Seats): number {
    return seats.normal + seats.discount + (seats.family * 4);
}

export function sumTickets(seats: Seats): number {
    return seats.normal + seats.discount + seats.family;
}

export function extractType<T>(data: unknown, model: T): T {
    if (typeof data !== 'object' || data === null)
        throw errors.invalidData;
    if (typeof model !== 'object')
        throw new Error('Model must be an object');
    const obj = data as Record<string, unknown>;
    const result: any = {};
    Object.keys(model).forEach(key => {
        if ((model as any)[key] !== undefined && obj[key] === undefined) {
            const e = errors.invalidData;
            e.message += `, missing key '${key}'`;
            throw e;
        }
        result[key] = obj[key];
    });
    return result;
}
