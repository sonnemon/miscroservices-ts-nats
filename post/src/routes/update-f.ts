import express, { Request, Response } from 'express';
import { Post } from '../models';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/post/gaa', async (req: Request, res: Response) => {
  const result = await Post.updateMany(
    { 'categories.id': mongoose.Types.ObjectId('622e954ce0fc7b001a280386') },
    {
      $set: {
        'categories.$.name': 'Category 1 - 7',
      },
    },
    { multi: true }
  );

  console.log(result);
  res.status(201).send({});
});

export { router as updateGaPostRouter };
