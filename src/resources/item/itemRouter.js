import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler.js';
import itemControllers from './itemControllers.js';

const itemRouter = Router();

// /api/item
itemRouter.route('/').get(catchErrors(itemControllers.find)).post(catchErrors(itemControllers.create));

// /api/item/:id
itemRouter
  .route('/:id')
  .get(catchErrors(itemControllers.findById))
  .put(catchErrors(itemControllers.updateOne))
  .delete(catchErrors(itemControllers.removeOne));

export default itemRouter;
