import { TicketUpdatedListener } from '../ticket-updated-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import {
	TicketUpdatedEvent,
	TicketUpdateEventData,
} from '@gtickets/nats-common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'

const setup = async () => {
	const listener = new TicketUpdatedListener(natsWrapper.client)

	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		price: 100,
		title: 'Concert',
	})

	await ticket.save()

	const data: TicketUpdateEventData = {
		id: ticket.id,
		version: ticket.version + 1,
		title: 'Batman concert',
		price: 321,
		userId: 'userId',
	}

	//@ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	}

  return { listener, data, msg, ticket}
}

it('Finds, updates and saves a ticket', async () => {})

it('Acts the message', async () => {})
