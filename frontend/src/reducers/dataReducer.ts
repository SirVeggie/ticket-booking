import { DataPacket } from '../datatypes';

const initialState: DataPacket = {
    shows: [],
    showtimes: []
};

//====| actions |====//

export function setData(data: DataPacket) {
    return { type: 'SET', data: data };
}

//====| reducer |====//

function dataReducer(state = initialState, action: dataAction) {
    switch (action.type) {
        case 'RESET':
            return initialState;
        case 'SET':
            return action.data;
        default:
            return state;
    }
}

export interface dataAction {
    type: string,
    data: DataPacket;
}

export default dataReducer;