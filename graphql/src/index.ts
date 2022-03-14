import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';
import config from './config';

(async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: resolvers,
      validate: true,
    }),
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app, cors: false });

  app.listen(config.port, () => {
    console.log(`Listening: http://localhost:${config.port}`);
  });
})();
