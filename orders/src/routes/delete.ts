import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/order';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@ticketing-umer/common';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError("Requested Order doesn't found");
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Canceled;
    await order.save();
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
