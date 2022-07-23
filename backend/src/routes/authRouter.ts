import { Router } from 'express';
import auth from '../auth';
import { checkAdmin, getIP } from './routerHelpers';

export const authRouter = Router();

//====| auth |====//

authRouter.get('/ip', (req, res) => {
    const ip = getIP(req);
    console.log('ip: ' + ip);
    res.send('ok');
});

authRouter.post('/login', async (req, res) => {
    if (!auth.checkPassword(req.body.password))
        return res.status(401).send('Invalid password');
    res.status(200).send(auth.getToken(getIP(req)));
});

authRouter.get('/check_token', async (req, res) => {
    checkAdmin(req);
    res.status(200).end();
});

authRouter.post('/refresh_token', async (req, res) => {
    checkAdmin(req);
    res.status(200).send(auth.getToken(getIP(req)));
});