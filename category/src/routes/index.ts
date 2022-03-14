import express, { Request, Response } from 'express';
import { Category } from '../models';

const router = express.Router();

router.get('/category', async (req: Request, res: Response) => {
  const categories = await Category.find();
  res.send(categories);
});

export { router as indexCategoryRouter };
