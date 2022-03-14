import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@sonnemontickets/common';

import { indexCategoryRouter } from './routes';
import { createCategoryRouter } from './routes/new';
import { showCategoryRouter } from './routes/show';
import { updateCategoryRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(currentUser);

app.use(indexCategoryRouter);
app.use(createCategoryRouter);
app.use(showCategoryRouter);
app.use(updateCategoryRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
