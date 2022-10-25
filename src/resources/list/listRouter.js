import { Router } from 'express';
import { catchErrors } from '../../utils/errorHandler.js';
import listControllers from './listControllers.js';

const listRouter = Router();

// /api/list
listRouter.route('/').get(catchErrors(listControllers.find)).post(catchErrors(listControllers.create));

// /api/list/:id
listRouter
  .route('/:id')
  .get(catchErrors(listControllers.findById))
  .put(catchErrors(listControllers.updateOne))
  .delete(catchErrors(listControllers.removeOne));

export default listRouter;
