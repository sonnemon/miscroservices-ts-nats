import express, { Request, Response } from 'express';
import { Post } from '../models';

const router = express.Router();

router.get('/post', async (req: Request, res: Response) => {
  const posts = await Post.find();
  res.send(posts);
});

export { router as indexPostRouter };
