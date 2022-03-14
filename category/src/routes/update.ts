import express, { Request, Response } from 'express';
import { NotFoundError } from '@sonnemontickets/common';
import { Category } from '../models';
import { CategoryUpdatedPublisher } from '../events/update-publisher';
import { natsWrapper } from '../services/nats-wrapper';

const router = express.Router();

router.put('/category/:id', async (req: Request, res: Response) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new NotFoundError();
  }
  category.set({
    name: req.body.name,
  });
  await category.save();

  await new CategoryUpdatedPublisher(natsWrapper.client).publish({
    id: category.id,
    name: category.name,
    version: category.version,
  });
  res.send(category);
});

export { router as updateCategoryRouter };
