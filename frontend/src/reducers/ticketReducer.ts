import { Ticket } from 'shared';

const initialState: Ticket | null = null;

//====| actions |====//

export function resetTicket() {
    return { type: 'TICKET_RESET' };
}

export function setTicket(data: Ticket | undefined) {
    return { type: 'TICKET_SET', data: data };
}

//====| reducer |====//

export function ticketReducer(state = initialState, action: ticketAction) {
    switch (action.type) {
        case 'TICKET_RESET':
            return initialState;
        case 'TICKET_SET':
            return action.data;
        default:
            return state;
    }
}

export interface ticketAction {
    type: 'TICKET_RESET' | 'TICKET_SET',
    data?: Ticket | undefined
}
