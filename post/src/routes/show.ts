import express, { Request, Response } from 'express';
import { Post } from '../models';
import { NotFoundError } from '@sonnemontickets/common';

const router = express.Router();

router.get('/post/:id', async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new NotFoundError();
  }
  res.send(post);
});

export { router as showPostRouter };
