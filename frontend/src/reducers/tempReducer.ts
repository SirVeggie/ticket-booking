
const initialState = '';

function tempReducer(state = initialState, action: tempAction) {
    switch (action.type) {
        case 'RESET':
            return initialState;
        case 'SET':
            return action.data;
        default:
            return state;
    }
}

export interface tempAction {
    type: string,
    data: string
}

export default tempReducer;