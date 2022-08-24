import { Router } from 'express';

const healthRouter = Router();

healthRouter.route('/').get((req, res) => {
  res.send('Healthy');
});

export default healthRouter;
