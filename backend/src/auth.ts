import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const data = JSON.parse(fs.readFileSync('admin.json').toString());

if (!data.hash) {
    changePassword('admin');
}

export function checkToken(token: string) {
    return jwt.verify(token, process.env.SECRET ?? '');
}

export function getToken(ip: string) {
    return jwt.sign({ ip }, process.env.SECRET ?? '', { expiresIn: '1h' });
}

export function checkPassword(pass: string): boolean {
    return bcrypt.compareSync(pass, data.hash);
}

export function changePassword(pass: string) {
    data.hash = bcrypt.hashSync(pass, 10);
    fs.writeFileSync('admin.json', JSON.stringify(data));
}

export default { checkToken, getToken, checkPassword, changePassword };