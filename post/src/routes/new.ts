import express, { Request, Response } from 'express';
import { Post } from '../models';

const router = express.Router();

router.post('/post', async (req: Request, res: Response) => {
  const { title, content, categories } = req.body as {
    title: string;
    content: string;
    categories: { id: string; name: string }[];
  };
  const post = Post.build({
    title,
    content,
    categories,
  });
  await post.save();

  res.status(201).send(post);
});

export { router as createPostRouter };
