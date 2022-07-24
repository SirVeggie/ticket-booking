import { DataPacket } from 'shared';

const initialState: DataPacket = new DataPacket();

//====| actions |====//

export function resetData(): DataAction {
    return { type: 'DATA_RESET' };
}

export function setData(data: DataPacket) {
    return { type: 'DATA_SET', data: data };
}

//====| reducer |====//

export function dataReducer(state = initialState, action: DataAction) {
    switch (action.type) {
        case 'DATA_RESET':
            return initialState;
        case 'DATA_SET':
            return action.data;
        default:
            return state;
    }
}

export interface DataAction {
    type: 'DATA_RESET' | 'DATA_SET',
    data?: DataPacket
}
