import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
  NotFoundError,
} from '@ticketing-umer/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  protected subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  protected queueGroupName: string = queueGroupName;

  protected async onMessage(
    data: TicketUpdatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!ticket) {
      // After throwing the error, we didn't call the msg.ack(), then after 5 seconds, nats-server will send these events again
      throw new NotFoundError('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    // after saving, the previous version that came from event, will be incremented and become equal to version that came from event
    await ticket.save();
    msg.ack();
  }
}
