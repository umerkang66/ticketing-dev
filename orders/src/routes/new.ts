import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  OrderStatus,
  BadRequestError,
} from '@ticketing-umer/common';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const ORDER_EXPIRATION_SECONDS = 15 * 60; // 15s

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const validator = [
  body('ticketId')
    .not()
    .isEmpty()
    // return boolean
    .custom((input: string) => ObjectId.isValid(input))
    .withMessage('TicketId must be provided'),
];

const middle = [requireAuth, validator, validateRequest];

// Ticket will be in the body or request
router.post('/api/orders', ...middle, async (req: Request, res: Response) => {
  // Find the ticket the user is trying to order in the database
  const { ticketId } = req.body;
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new NotFoundError("Ticket you want to order doesn't exist");
  }

  // Make sure that this ticket is not already reserved
  const ticketReserved = await ticket.isReserved();
  if (ticketReserved) {
    // order is already reserved, return early
    throw new BadRequestError('Ticket is already reserved to an order');
  }

  // Calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + ORDER_EXPIRATION_SECONDS);

  // Build the order and save it to the database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    // this will not add the ticket, but it will add the ref to ticket doc (ticket.id)
    ticket,
  });
  await order.save();

  // TODO: Publish an event that order was created

  res.status(201).send(order);
});

export { router as newOrderRouter };
