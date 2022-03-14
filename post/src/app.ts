import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@sonnemontickets/common';

import { indexPostRouter } from './routes';
import { createPostRouter } from './routes/new';
import { showPostRouter } from './routes/show';
import { updatePostRouter } from './routes/update';
import { updateGaPostRouter } from './routes/update-f';

// import { createTicketRouter } from "./routes/new";

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(currentUser);

app.use(updateGaPostRouter);
app.use(indexPostRouter);
app.use(createPostRouter);
app.use(showPostRouter);
app.use(updatePostRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
