
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

export class Ticket {
    id: string = '';
    showtimeid: string = '';
    confirmed: boolean = false;
    name: string = '';
    email: string = '';
    phonenumber: Phonenumber = new Phonenumber();
    seats: Seats = new Seats();
}

export class Phonenumber {
    countrycode: number = 0;
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