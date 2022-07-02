// Message is the raw event coming from nats server
import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@ticketing-umer/common';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  protected subject: Subjects.TicketCreated = Subjects.TicketCreated;
  // all the listeners on order service should have teh same queueGroupName
  protected queueGroupName: string = 'orders-service';

  protected onMessage(data: TicketCreatedEvent['data'], msg: Message): void {}
}
