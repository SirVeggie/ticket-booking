import { Router } from 'express';
import { extractType, Seats, ticketModel, ticketPath } from 'shared';
import database from '../database';
import { ticketConfirmAccept, ticketConfirmation } from '../tools/email';
import { del, getall, isAdmin, replace } from './routerHelpers';

export const ticketRouter = Router();

//===| tickets |===//

ticketRouter.get('/', getall('tickets', true));
ticketRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const data = await database.tickets.get(id).catch(() => next());
    if (!data?.confirmed)
        return;
    return res.json(data);
});
ticketRouter.post('/', async (req, res) => {
    const data = extractType(req.body, ticketModel);
    const result = await database.tickets.add(data);
    if (!result.confirmed)
        ticketConfirmation(result.email, result.id);
    res.json(result);
});
ticketRouter.put('/:id', replace('tickets', false));
ticketRouter.delete('/:id', del('tickets', false));

ticketRouter.post('/:id/update_seats', async (req, res) => {
    const id = req.params.id;
    const data = extractType(req.body, new Seats());
    let admin = false;
    try {
        admin = isAdmin(req);
    // eslint-disable-next-line no-empty
    } catch { }

    await database.tickets.updateSeats(id, data, admin);
    res.status(200).end();
});

ticketRouter.get('/ticket_amounts', async (req, res) => {
    console.log('fetch ticket_amounts');
    const data = await database.tickets.getAmounts();
    res.json(data);
});

ticketRouter.post('/confirm/:id', async (req, res) => {
    const id = req.params.id;
    const data = await database.tickets.get(id);

    if (data.confirmed)
        return res.status(410).send('Confirmation link already processed');

    data.confirmed = true;
    await database.tickets.replace(id, data);
    ticketConfirmAccept(data.email, data.id);
    res.redirect(`${ticketPath}/${id}`);
});