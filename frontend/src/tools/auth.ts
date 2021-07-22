import axios from 'axios';

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

async function check() {
    const token = window.localStorage.getItem('token');
    if (!token)
        return false;
    try {
        await axios.get('/api/check_token', getConfig());
        return true;
    } catch {
        return false;
    }
}

async function refresh() {
    const token = window.localStorage.getItem('token');
    if (!token)
        return;
    try {
        const newToken = await (await axios.post('/api/refresh_token', getConfig())).data;
        window.localStorage.setItem('token', newToken);
    } catch {
        //
    }
}

export default { getConfig, check, refresh };