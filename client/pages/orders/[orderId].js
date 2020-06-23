import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

const OrderShow = ({ order, currentUser }) => {
	const [timeLeft, setTimeleft] = useState(0)

	const { doRequest, errors } = useRequest({
		url: '/api/payments',
		method: 'post',
		onSuccess: () => Router.push('/orders'),
	})

	useEffect(() => {
		const findTimeLeft = () => {
			const milisecondsLeft = new Date(order.expiresAt) - new Date()

			setTimeleft(Math.round(milisecondsLeft / 1000))
		}

		findTimeLeft()

		const timerId = setInterval(findTimeLeft, 1000)

		/**
		 * When a function is returned from UseEffect, that function will be
		 * invoked when you navigate away from this component (always) or if
		 * the component is going to be rerendered (only if the [] has
		 * something and it was updated).
		 */
		return () => {
			clearInterval(timerId)
		}
	}, [])

	if (timeLeft <= 0) {
		return <div> Order expired</div>
	}

	return (
		<div>
			Time left to pay: {timeLeft} seconds
			<StripeCheckout
				token={({ id }) =>
					doRequest({
						orderId: order.id,
						token: id,
					})
				}
				stripeKey="pk_test_51GwV0pCpSWfIq0dFJiyyHGgUaXyMwSUi8dTPOwYQaNsP3eRQWAqiEXDpAbiZVqRP925p6mP2gpCeIJ5X8hqQffJq00yXBtGzX4"
				amount={order.ticket.price * 100}
				email={currentUser.email}
			/>
			{errors}
		</div>
	)
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query

	const { data } = await client.get(`/api/orders/${orderId}`)

	return { order: data }
}

export default OrderShow
