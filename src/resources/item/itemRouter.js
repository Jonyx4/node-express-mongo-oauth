import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler.js';
import itemControllers from './itemControllers.js';

const itemRouter = Router();

// /api/item
itemRouter.route('/').get(catchErrors(itemControllers.getMany)).post(catchErrors(itemControllers.createOne));

// /api/item/:id
itemRouter
  .route('/:id')
  .get(catchErrors(itemControllers.findById))
  .put(catchErrors(itemControllers.updateOne))
  .delete(catchErrors(itemControllers.removeOne));

export default itemRouter;
