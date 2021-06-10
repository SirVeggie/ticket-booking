import axios from 'axios';
import { Show, Showtime, Ticket } from '../datatypes';
import fixDates from './fixDates';

const baseUrl = '/api';
const shows = baseUrl + '/shows';
const showtimes = baseUrl + '/showtimes';
const tickets = baseUrl + '/tickets';

function getall<Type>(target: string): () => Promise<Type[]> {
    return () => axios.get(target).then(x => fixDates(x.data));
}

function get<Type>(target: string): (id: string) => Promise<Type> {
    return id => axios.get(target + '/' + id).then(x => fixDates(x.data));
}

function add<Type>(target: string): (show: Type) => Promise<Type> {
    return show => axios.post(target, show).then(x => fixDates(x.data));
}

function replace<Type>(target: string): (id: string, show: Type) => Promise<void> {
    return (id, show) => axios.put(target + '/' + id, show);
}

function del(target: string): (id: string) => Promise<void> {
    return id => axios.delete(target + '/' + id);
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
    shows: generate<Show>(shows),
    showtimes: generate<Showtime>(showtimes),
    tickets: generate<Ticket>(tickets)
};