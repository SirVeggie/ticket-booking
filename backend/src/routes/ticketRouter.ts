import { Router } from 'express';
import { extractType, Seats, ticketModel, ticketPath } from 'shared';
import database from '../database';
import { ticketConfirmAccept, ticketConfirmation } from '../tools/email';
import { del, getall, isAdmin, replace } from './routerHelpers';

export const ticketRouter = Router();

const confirmations: Record<string, ((status: number) => void)[]> = {};

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
    if (!result.confirmed) {
        ticketConfirmation(result.email, result.id);
        setTimeout(async () => {
            if ((await database.tickets.get(result.id)).confirmed)
                return;
            confirmations[result.id]?.forEach(f => f?.(410));
            delete confirmations[result.id];
            database.tickets.delete(result.id);
        }, 1000 * 60 * 60);
    }
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

ticketRouter.get('/seat_amounts', async (req, res) => {
    console.log('fetch ticket_amounts');
    const data = await database.tickets.getSeatAmounts();
    res.json(data);
});

ticketRouter.get('/confirm/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const ticket = await database.tickets.get(id);
        if (ticket.confirmed)
            return res.status(410).end();
        confirmations[id] = [...(confirmations[id] ?? []), status => res.status(status).end()];
    } catch (error) {
        console.log(error);
        return res.status(404).end();
    }
});

ticketRouter.post('/confirm/:id', async (req, res) => {
    const id = req.params.id;
    const data = await database.tickets.get(id);

    if (data.confirmed)
        return res.status(410).send('Confirmation link already processed');

    data.confirmed = true;
    await database.tickets.replace(id, data);
    confirmations[id]?.forEach(f => f?.(200));
    delete confirmations[id];
    ticketConfirmAccept(data.email, data.id);
    res.redirect(`${ticketPath}/${id}`);
});