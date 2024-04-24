export const rabbitmqConfig = {
	uri: 'amqp://guest:guest@localhost:5672',
	users: {
		exchange: 'users_exchange',
		routingKey: {
			create: 'user.create',
		},
	},
};
