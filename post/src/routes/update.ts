import express, { Request, Response } from 'express';
import { NotFoundError } from '@sonnemontickets/common';
import { Post } from '../models';

const router = express.Router();

router.put('/post/:id', async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);
  const { title, content, categories } = req.body as {
    title: string;
    content: string;
    categories: { id: string; name: string }[];
  };
  if (!post) {
    throw new NotFoundError();
  }
  post.set({
    title,
    content,
    categories,
  });
  await post.save();

  res.send(post);
});

export { router as updatePostRouter };
