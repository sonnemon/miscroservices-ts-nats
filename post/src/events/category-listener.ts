import { CategoryUpdatedEvent, Subjects } from '../interfaces';
import { Listener } from './listener';
import { Message } from 'node-nats-streaming';
import { Post } from '../models';
import mongoose from 'mongoose';

const queueGroupName = 'post-service';

export class CategoryUpdateListener extends Listener<CategoryUpdatedEvent> {
  subject: Subjects.CategoryUpdated = Subjects.CategoryUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: CategoryUpdatedEvent['data'], msg: Message) {
    await Post.updateMany(
      { 'categories.id': mongoose.Types.ObjectId(data.id) },
      {
        $set: {
          'categories.$.name': data.name,
        },
      },
      { multi: true }
    );
    msg.ack();
  }
}
