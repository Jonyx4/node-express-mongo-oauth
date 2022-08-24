import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler.js';
import { createUser, findById, find, deleteById, updateById } from './oauthControllers.js';

const oauthUserRouter = Router();

oauthUserRouter.post('/', catchErrors(createUser));
oauthUserRouter.get('/:id', catchErrors(findById));
oauthUserRouter.get('/', catchErrors(find));
oauthUserRouter.delete('/:id', catchErrors(deleteById));
oauthUserRouter.put('/:id', catchErrors(updateById));

export default oauthUserRouter;
