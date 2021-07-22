
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
    color?: string = '';
    imageUrl?: string = '';
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
    comment?: string = '';
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