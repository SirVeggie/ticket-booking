import { Router } from 'express';
import database from '../database';
import { add, del, getall, getone, replace, showtimeModel } from './routerHelpers';

export const showtimeRouter = Router();

//===| showtimes |===//

showtimeRouter.get('/', getall('showtimes', false));
showtimeRouter.get('/:id', getone('showtimes', false));
showtimeRouter.post('/', add('showtimes', true, showtimeModel));
showtimeRouter.put('/:id', replace('showtimes', true, showtimeModel));
showtimeRouter.delete('/:id', del('showtimes', true));

showtimeRouter.get('/:id/available_seats', async (req, res) => {
    const id = req.params.id;
    const data = await database.showtimes.getAvailableSeats(id);
    res.json(data);
});