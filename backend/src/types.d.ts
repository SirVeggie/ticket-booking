
interface Show {
    id: string,
    name: string
}

interface Showtime {
    id: string,
    showid: string,
    date: Date,
    location: string
}

interface Ticket {
    id: string,
    showtimeid: string,
    confirmed: boolean,
    name: string,
    email: string,
    phonenumber: Phonenumber,
    seats: Seats
}

interface Phonenumber {
    countrycode: number,
    number: string
}

interface Seats {
    normal: number,
    discount: number,
    family: number
}