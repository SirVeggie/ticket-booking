
const initialState = !!window.localStorage.getItem('token') ?? false;

//====| actions |====//

export function setLoginStatus(state: boolean): AdminAction {
    return { type: 'ADMIN_SET', data: state };
}

//====| reducer |====//

function adminReducer(state = initialState, action: AdminAction) {
    switch (action.type) {
        case 'ADMIN_SET':
            return action.data;
        default:
            return state;
    }
}

export interface AdminAction {
    type: 'ADMIN_SET'
    data: boolean
}

export default adminReducer;