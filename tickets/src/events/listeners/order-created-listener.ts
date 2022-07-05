import {
  Listener,
  NotFoundError,
  OrderCreatedEvent,
  Subjects,
} from '@ticketing-umer/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  protected subject: Subjects.OrderCreated = Subjects.OrderCreated;
  protected queueGroupName: string = queueGroupName;

  protected async onMessage(
    data: OrderCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    // find the ticket that order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    // mark the ticket reserved, by setting its orderId property
    ticket.set({ orderId: data.id });
    // save the ticket
    await ticket.save();

    // version of ticket is updated, send the event, here we want to throw an error (not call ack), if anything goes wrong
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    // ack the message
    msg.ack();
  }
}