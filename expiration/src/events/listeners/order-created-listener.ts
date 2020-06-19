import {
	Listener,
	OrderCreatedEvent,
	Subjects,
	OrderStatus,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated
	queueGroupName = queueGroupName
	async onMessage(data: OrderCreatedEvent['data']) {
		throw new Error('Method not implemented.')
	}
}
