import { Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../../../../../shared/application/services/logger-factory.service';
import { UserCreatedDomainEvent } from '../../../../../../../shared/domain/events/user-created.domain-event';
import { Sleep } from '../../../../../../../shared/infrastructure/decorators/sleep.decorator';
import { RabbitMQUserCreatedSubscribe } from '../../../../../../../shared/infrastructure/rabbitmq/decorators/rabbitmq-user-created-subscribe.decorator';
import { rabbitmqConfig } from '../../../../../../../shared/infrastructure/rabbitmq/rabbitmq.config';
import { CreateBackofficeUserRequest } from '../dtos/create-backoffice-user-request.dto';
import { BackofficeUserCreator } from './backoffice-user-creator.service';

const { users } = rabbitmqConfig;

const logger = LoggerFactory.create('UserCreatedFromAPISubscriber');

@Injectable()
export class UserCreatedFromAPISubscriber {
	constructor(private readonly creator: BackofficeUserCreator) {}

	@RabbitMQUserCreatedSubscribe('users_created_create_backoffice_user_queue')
	@Sleep(1500)
	async run(payload: UserCreatedDomainEvent): Promise<void> {
		logger.debug(`Creating backoffice user in database to event <${payload.eventId}>`);

		try {
			const request = payload.attributes as CreateBackofficeUserRequest;

			await this.creator.run(request);
		} catch (error) {
			logger.error(`Error creating backoffice user in database to event <${payload.eventId}>`);
		}
	}
}
