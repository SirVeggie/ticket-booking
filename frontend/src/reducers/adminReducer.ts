import { Ticket } from 'shared';

const initialState: AdminData = {
    status: !!window.localStorage.getItem('token') ?? false,
    tickets: []
};

//====| actions |====//

export function setLoginStatus(state: boolean): AdminAction {
    return { type: 'ADMIN_SET', data: state };
}

export function setTicketList(state: Ticket[]): AdminAction {
    return { type: 'ADMIN_SET_TICKETS', data: state };
}

export function addTicketData(ticket: Ticket): AdminAction {
    return { type: 'ADMIN_ADD_TICKET', data: ticket };
}

//====| reducer |====//

function adminReducer(state = initialState, action: AdminAction) {
    switch (action.type) {
        case 'ADMIN_SET':
            if (!action.data)
                return { status: action.data, tickets: [] };
            return { ...state, status: action.data };
        case 'ADMIN_SET_TICKETS':
            return { ...state, tickets: action.data };
        case 'ADMIN_ADD_TICKET':
            return { ...state, tickets: [...state.tickets, action.data] };
        default:
            return state;
    }
}

export interface AdminAction {
    type: 'ADMIN_SET' | 'ADMIN_SET_TICKETS' | 'ADMIN_ADD_TICKET';
    data: boolean | Ticket[] | Ticket;
}

export interface AdminData {
    status: boolean,
    tickets: Ticket[];
}

export default adminReducer;