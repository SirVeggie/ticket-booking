import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import database from './database';
import extractType from './tools/extractType';
import errors from './tools/errors';
import { Show, Showtime, Ticket } from './datatypes';

//====| middleware |====//

morgan.token('body', (req: any) => JSON.stringify(req.body));

const server = express();
// server.use(express.static('build'));
server.use(express.json());
server.use(cors());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//===| models |===//

const showModel: Show = new Show();
const showtimeModel: Showtime = new Showtime();
const ticketModel: Ticket = new Ticket();

//===| generic |===//

type DataType = 'shows' | 'showtimes' | 'tickets';

function getall(target: DataType) {
    return async (req: any, res: any) => {
        const result = await database[target].getall();
        res.json(result);
    };
}

function getone(target: DataType) {
    return async (req: any, res: any) => {
        const id = req.params.id;
        const data = await database[target].get(id);
        res.json(data);
    };
}

function add(target: DataType, model: any) {
    return async (req: any, res: any) => {
        const data = extractType(req.body, model);
        const result = await database[target].add(data);
        res.json(result);
    };
}

function replace(target: DataType, model: any) {
    return async (req: any, res: any) => {
        const data = extractType(req.body, model);
        data.id = req.params.id;
        const result = await database[target].replace(data.id, data);
        res.json(result);
    };
}

function del(target: DataType) {
    return async (req: any, res: any) => {
        const id = req.params.id;
        await database[target].delete(id);
        res.status(204).end();
    };
}

//====| shows |====//

server.get('/api/shows', getall('shows'));
server.get('/api/shows/:id', getone('shows'));
server.post('/api/shows', add('shows', showModel));
server.put('/api/shows/:id', replace('shows', showModel));
server.delete('/api/shows/:id', del('shows'));

//===| showtimes |===//

server.get('/api/showtimes', getall('showtimes'));
server.get('/api/showtimes/:id', getone('showtimes'));
server.post('/api/showtimes', add('showtimes', showtimeModel));
server.put('/api/showtimes/:id', replace('showtimes', showtimeModel));
server.delete('/api/showtimes/:id', del('showtimes'));

//===| tickets |===//

server.get('/api/tickets', getall('tickets'));
server.get('/api/tickets/:id', getone('tickets'));
server.post('/api/tickets', add('tickets', ticketModel));
server.put('/api/tickets/:id', replace('tickets', ticketModel));
server.delete('/api/tickets/:id', del('tickets'));

//====| other |====//

function unknownEndpoint(req: any, res: any) {
    res.status(404).send('unknown endpoint');
}

server.use(unknownEndpoint);

function errorHandler(error: any, req: any, res: any, next: any) {
    console.error(error.message);

    if (error === errors.noData)
        return res.status(404).send('unknown endpoint');
    if (error === errors.invalidData)
        return res.status(400).send('Data provided was invalid');
    // if (error.name == 'ValidationError')
    //     return res.status(400).send(error.message);

    next(error);
}

server.use(errorHandler);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});