import { Router } from 'express';
import { add, del, getall, getone, replace } from './routerHelpers';

export const showRouter = Router();

//====| shows |====//

showRouter.get('/', getall('shows', false));
showRouter.get('/:id', getone('shows', false));
showRouter.post('/', add('shows', true));
showRouter.put('/:id', replace('shows', true));
showRouter.delete('/:id', del('shows', true));