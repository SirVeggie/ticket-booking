import { Router } from 'express';
import database from '../database';
import { add, checkAdmin, del, getall, getone, replace } from './routerHelpers';

export const showRouter = Router();

//====| shows |====//

showRouter.get('/', getall('shows', false));
showRouter.get('/:id', getone('shows', false));
showRouter.post('/', add('shows', true));
showRouter.put('/:id', replace('shows', true));
showRouter.delete('/:id', del('shows', true));
showRouter.post('/:id/hidden', async (req, res) => {
    checkAdmin(req);
    await database.shows.setHidden(req.params.id, req.body.hidden);
    res.status(200).end();
});