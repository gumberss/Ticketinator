import buildClient from '../api/build-client'

const LandingPage = ({ currentUser, tickets }) => {
	const ticketList = tickets.map(ticket => {
		return (
			<tr key={ticket.id}>
				<td>{ticket.title}</td>
				<td>{ticket.price}</td>
			</tr>
		)
	})

	return currentUser ? (
		<div>
			<h2> Tickets</h2>
			<table className="table">
				<thead>
					<tr>
						<th> Title</th>
						<th> Price</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	) : (
		<h1>You are NOT signed in</h1>
	)
}

LandingPage.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get('/api/tickets')
	return { tickets: data }
}

export default LandingPage
