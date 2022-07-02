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
    const ticket = await Ticket.findById(data.id);

    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }
  }
}
