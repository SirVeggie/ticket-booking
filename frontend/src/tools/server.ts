import axios from 'axios';

async function login(password: string) {
    const result = await axios.post('/api/login', { password: password });
    return result.data;
}

export default { login };