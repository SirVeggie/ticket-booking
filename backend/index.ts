import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import database from './src/database';
import { apiPath, extractType, MiscData, showPath, showtimePath, ticketPath } from 'shared';
import { checkAdmin } from './src/routes/routerHelpers';
import { authRouter } from './src/routes/authRouter';
import { ticketRouter } from './src/routes/ticketRouter';
import { showRouter } from './src/routes/showRouter';
import { showtimeRouter } from './src/routes/showtimeRouter';
import { errorHandler, unknownEndpoint } from './src/middleware';
import mongoose from 'mongoose';

//====| check env |====//

if (!process.env.PORT)
    throw new Error('PORT is not defined');
if (!process.env.SECRET)
    throw new Error('SECRET is not defined');
if (!process.env.EMAIL_PASS)
    throw new Error('EMAIL_PASS is not defined');
if (!process.env.DOMAIN)
    throw new Error('DOMAIN is not defined');
if (!process.env.MONGODB_URI)
    throw new Error('MONGODB_URI is not set');
    
//====| database |====//

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(`Error connecting to database: ${err}`);
});

//====| middleware |====//

morgan.token('body', (req: any) => JSON.stringify(req.body));

const server = express();
server.use(express.json());
server.use(express.static('build'));
server.use(cors());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//====| common |====//

server.get('/api/health', (req, res) => {
    res.send('ok');
});

server.get('/api/error', (req, res) => {
    res.status(400).send({ error: 'This is an error message' });
});

server.post('/api/reset', async (req, res) => {
    await database.reset();
    res.status(200).end();
});

server.get('/api/packet', async (req, res) => {
    res.json(await database.getPacket());
});

server.get('/api/misc', async (req, res) => {
    res.json(database.getMisc());
});

server.put('/api/misc', async (req, res) => {
    checkAdmin(req);
    const data = extractType(req.body, new MiscData());
    res.json(database.replaceMisc(data));
});

//====| routers |====//

server.use(apiPath, authRouter);
server.use(showPath, showRouter);
server.use(showtimePath, showtimeRouter);
server.use(ticketPath, ticketRouter);

//====| static files |====//

server.get('*', (req, res, next) => {
    const path = (req as any).params['0'];
    if (!path.includes('/api/')) {
        res.sendFile(`${__dirname}/index.html`);
    } else {
        next();
    }
});

//====| middleware |====//

server.use(unknownEndpoint);
server.use(errorHandler);

//====| start |====//

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});