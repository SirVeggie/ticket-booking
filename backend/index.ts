import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';
import database from './src/database';
import { apiPath, MiscData, showPath, showtimePath, ticketPath } from 'shared';
import { checkAdmin } from './src/routes/routerHelpers';
import { authRouter } from './src/routes/authRouter';
import { extractType } from './src/tools/extractType';
import { ticketRouter } from './src/routes/ticketRouter';
import { showRouter } from './src/routes/showRouter';
import { showtimeRouter } from './src/routes/showtimeRouter';
import { errorHandler, unknownEndpoint } from './src/middleware';

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

server.get('/api/packet', async (req, res) => {
    res.json(await database.getPacket());
});

server.get('/api/misc', async (req, res) => {
    res.json(await database.getMisc());
});

server.put('/api/misc', async (req, res) => {
    checkAdmin(req);
    const data = extractType(req.body, new MiscData());
    res.json(await database.replaceMisc(data));
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