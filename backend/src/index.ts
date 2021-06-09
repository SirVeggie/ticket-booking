import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import database from './database';
import extractType from './tools/extractType';
import errors from './tools/errors';

//====| middleware |====//

morgan.token('body', (req: any) => JSON.stringify(req.body));

const server = express();
// server.use(express.static('build'));
server.use(express.json());
server.use(cors());
server.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

//===| models |===//

const showModel: Show = {
    id: undefined,
    name: undefined
};

const showtimeModel: Showtime = {
    id: undefined,
    showid: undefined,
    date: undefined,
    location: undefined
};

const ticketModel: Ticket = {
    id: undefined,
    showtimeid: undefined,
    confirmed: undefined,
    name: undefined,
    email: undefined,
    phonenumber: undefined,
    seats: undefined
};

//===| generic |===//

type DataType = 'show' | 'showtime' | 'ticket';

function getall(target: DataType) {
    return async (req, res) => {
        const result = await database[target].getall();
        res.json(result);
    };
}

function getone(target: DataType) {
    return async (req, res) => {
        const id = req.params.id;
        const data = await database[target].get(id);
        res.json(data);
    };
}

function add(target: DataType, model: any) {
    return async (req, res) => {
        const data = extractType(req.body, model);
        const result = await database[target].add(data);
        res.json(result);
    };
}

function replace(target: DataType, model: any) {
    return async (req, res) => {
        const data = extractType(req.body, model);
        data.id = req.params.id;
        const result = await database[target].replace(data.id, data);
        res.json(result);
    };
}

function del(target: DataType) {
    return async (req, res) => {
        const id = req.params.id;
        await database[target].delete(id);
        res.status(204).end();
    };
}

//====| shows |====//

server.get('/api/shows', getall('show'));
server.get('/api/shows/:id', getone('show'));
server.post('/api/shows', add('show', showModel));
server.put('/api/shows/:id', replace('show', showModel));
server.delete('/api/shows/:id', del('show'));

//===| showtimes |===//

server.get('/api/shows', getall('showtime'));
server.get('/api/shows/:id', getone('showtime'));
server.post('/api/shows', add('showtime', showtimeModel));
server.put('/api/shows/:id', replace('showtime', showtimeModel));
server.delete('/api/shows/:id', del('showtime'));

//===| tickets |===//

server.get('/api/shows', getall('ticket'));
server.get('/api/shows/:id', getone('ticket'));
server.post('/api/shows', add('ticket', ticketModel));
server.put('/api/shows/:id', replace('ticket', ticketModel));
server.delete('/api/shows/:id', del('ticket'));

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