import axios from 'axios';
import { DataPacket, Show, Showtime, Ticket } from '../datatypes';
import fixDates from './fixDates';

const baseUrl = '/api';
const shows = baseUrl + '/shows';
const showtimes = baseUrl + '/showtimes';
const tickets = baseUrl + '/tickets';

function getConfig() {
    const token = window.localStorage.getItem('token');
    if (!token)
        return undefined;
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    };
}

function getall<Type>(target: string): () => Promise<Type[]> {
    return () => axios.get(target, getConfig()).then(x => fixDates(x.data));
}

function get<Type>(target: string): (id: string) => Promise<Type> {
    return id => axios.get(target + '/' + id, getConfig()).then(x => fixDates(x.data));
}

function add<Type>(target: string): (show: Type) => Promise<Type> {
    return show => axios.post(target, show, getConfig()).then(x => fixDates(x.data));
}

function replace<Type>(target: string): (id: string, show: Type) => Promise<void> {
    return (id, show) => axios.put(target + '/' + id, show, getConfig());
}

function del(target: string): (id: string) => Promise<void> {
    return id => axios.delete(target + '/' + id, getConfig());
}

function getPacket(): Promise<DataPacket> {
    return axios.get(baseUrl + '/packet').then(x => fixDates(x.data));
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
    showtimes: generate<Showtime>(showtimes),
    tickets: generate<Ticket>(tickets)
};