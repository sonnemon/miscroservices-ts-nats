import express, { Request, Response } from 'express';
import { Category } from '../models';
import { NotFoundError } from '@sonnemontickets/common';

const router = express.Router();

router.get('/category/:id', async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new NotFoundError();
  }
  res.send(category);
});

export { router as showCategoryRouter };
