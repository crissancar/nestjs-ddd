import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

import { rabbitmqConfig } from './rabbitmq.config';

const { uri, users } = rabbitmqConfig;

export const nestjsRabbitmqConfig: RabbitMQConfig = {
	uri,
	exchanges: [
		{
			name: users.exchange,
			type: 'fanout',
		},
	],
	channels: {
		users: { prefetchCount: 10 },
	},
	queues: [
		{
			name: 'users_created_create_message_queue',
			exchange: users.exchange,
			createQueueIfNotExists: true,
		},
		{
			name: 'users_created_create_backoffice_user_queue',
			exchange: users.exchange,
			createQueueIfNotExists: true,
		},
	],
};
