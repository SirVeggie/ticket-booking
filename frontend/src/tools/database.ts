import axios from 'axios';
import { DataPacket, Seats, Show, Showtime, Ticket } from 'shared';
import auth from './auth';
import fixDates from './fixDates';

const baseUrl = '/api';
const shows = baseUrl + '/shows';
const showtimes = baseUrl + '/showtimes';
const tickets = baseUrl + '/tickets';

function getall<Type>(target: string): () => Promise<Type[]> {
    return () => axios.get(target, auth.getConfig()).then(x => fixDates(x.data));
}

function get<Type>(target: string): (id: string) => Promise<Type> {
    return id => axios.get(target + '/' + id, auth.getConfig()).then(x => fixDates(x.data));
}

function add<Type>(target: string): (show: Type) => Promise<Type> {
    return show => axios.post(target, show, auth.getConfig()).then(x => fixDates(x.data));
}

function replace<Type>(target: string): (id: string, show: Type) => Promise<void> {
    return (id, show) => axios.put(target + '/' + id, show, auth.getConfig());
}

function del(target: string): (id: string) => Promise<void> {
    return id => axios.delete(target + '/' + id, auth.getConfig());
}

function getPacket(): Promise<DataPacket> {
    return axios.get(baseUrl + '/packet').then(x => fixDates(x.data));
}

function getTicketAmounts(): Promise<Record<string, number>> {
    return axios.get(baseUrl + '/ticket_amounts').then(x => x.data);
}

function getAvailableSeats(id: string): Promise<number> {
    return axios.get(baseUrl + '/available_seats/' + id).then(x => x.data);
}

function updateTicketSeats(id: string, seats: Seats): Promise<void> {
    return axios.post(baseUrl + '/update_seats/' + id, seats, auth.getConfig());
}

//====| exports |====//

function generate<Type>(target: string) {
    return {
        getall: getall<Type>(target),
        get: get<Type>(target),
        add: add<Type>(target),
        replace: replace<Type>(target),
        delete: del(target)
    };
}

export default {
    getPacket,
    shows: generate<Show>(shows),
    showtimes: {
        ...generate<Showtime>(showtimes),
        getAvailableSeats
    },
    tickets: {
        ...generate<Ticket>(tickets),
        getAmounts: getTicketAmounts,
        updateSeats: updateTicketSeats
    }
};