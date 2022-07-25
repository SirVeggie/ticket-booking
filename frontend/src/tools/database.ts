import axios from 'axios';
import { apiPath, DataPacket, Seats, Show, showPath, Showtime, showtimePath, Ticket, ticketPath } from 'shared';
import auth from './auth';
import fixDates from './fixDates';

function handleError(reason: any): any {
    if (reason.response?.status?.toString().startsWith('4'))
        if (reason.response.data)
            throw { ...reason.response.data, status: reason.response.status };
    throw reason;
}

function getall<Type>(target: string): () => Promise<Type[]> {
    return () => axios.get(target, auth.getConfig())
        .then(x => fixDates(x.data))
        .catch(handleError);
}

function get<Type>(target: string): (id: string) => Promise<Type> {
    return id => axios.get(`${target}/${id}`, auth.getConfig())
        .then(x => fixDates(x.data))
        .catch(handleError);
}

function add<Type>(target: string): (show: Type) => Promise<Type> {
    return show => axios.post(target, show, auth.getConfig())
        .then(x => fixDates(x.data))
        .catch(handleError);
}

function replace<Type>(target: string): (id: string, show: Type) => Promise<void> {
    return (id, show) => axios.put(`${target}/${id}`, show, auth.getConfig()).catch(handleError);
}

function del(target: string): (id: string) => Promise<void> {
    return id => axios.delete(`${target}/${id}`, auth.getConfig()).catch(handleError);
}

function getPacket(): Promise<DataPacket> {
    return axios.get(`${apiPath}/packet`)
        .then(x => fixDates(x.data))
        .catch(handleError);
}

function getTicketAmounts(): Promise<Record<string, number>> {
    return axios.get(`${ticketPath}/ticket_amounts`)
        .then(x => x.data)
        .catch(handleError);
}

function getAvailableSeats(id: string): Promise<number> {
    return axios.get(`${showtimePath}/${id}/available_seats`)
        .then(x => x.data)
        .catch(handleError);
}

function updateTicketSeats(id: string, seats: Seats): Promise<void> {
    return axios.post(`${ticketPath}/${id}/update_seats`, seats, auth.getConfig()).catch(handleError);
}

function checkConfirmTicket(id: string): Promise<void> {
    return axios.get(`${ticketPath}/confirm/${id}`).catch(handleError);
}

function confirmTicket(id: string): Promise<void> {
    return axios.post(`${ticketPath}/confirm/${id}`).catch(handleError);
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
    shows: generate<Show>(showPath),
    showtimes: {
        ...generate<Showtime>(showtimePath),
        getAvailableSeats
    },
    tickets: {
        ...generate<Ticket>(ticketPath),
        getAmounts: getTicketAmounts,
        updateSeats: updateTicketSeats,
        confirm: confirmTicket,
        checkConfirm: checkConfirmTicket
    }
};