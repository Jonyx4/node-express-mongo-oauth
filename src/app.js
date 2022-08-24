import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import morgan from 'morgan';
import OAuthServer from 'express-oauth-server';

import { notFound, developmentErrors, productionErrors } from './utils/errorHandler.js';
import healthRouter from './resources/health/healthRouter.js';
import itemRouter from './resources/item/itemRouter.js';
import listRouter from './resources/list/listRouter.js';
import logger from './utils/logger.js';
import * as mongoStore from './resources/oauth/oauthControllers.js';
import userRouter from './resources/oauth/oauthUserRouter.js';

const app = express();
app.oauth = new OAuthServer({ model: mongoStore });

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));
app.use(expressWinston.logger({ winstonInstance: logger }));

app.use('/', healthRouter);
app.post('/oauth/token', app.oauth.token());

app.use('/api', app.oauth.authenticate());
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/lists', listRouter);

app.use(expressWinston.errorLogger({ winstonInstance: logger }));

app.use(notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(developmentErrors);
}

// production error handler
app.use(productionErrors);

export default app;
