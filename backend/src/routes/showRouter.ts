import { Router } from 'express';
import { add, del, getall, getone, replace, showModel } from './routerHelpers';

export const showRouter = Router();

//====| shows |====//

showRouter.get('/', getall('shows', false));
showRouter.get('/:id', getone('shows', false));
showRouter.post('/', add('shows', true, showModel));
showRouter.put('/:id', replace('shows', true, showModel));
showRouter.delete('/:id', del('shows', true));