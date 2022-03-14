import express, { Request, Response } from 'express';
import { Category } from '../models';

const router = express.Router();

router.post('/category', async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = Category.build({
    name,
  });
  await category.save();

  res.status(201).send(category);
});

export { router as createCategoryRouter };
