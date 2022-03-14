import { CategoryUpdateListener } from './events/category-listener';
import { app } from './app';
import mongoose from 'mongoose';
import { natsWrapper } from './services/nats-wrapper';

const start = async () => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    new CategoryUpdateListener(natsWrapper.client).listen();

    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log('Listening: http://localhost:3000');
  });
};

start();
