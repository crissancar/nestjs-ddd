import { Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../../../../../shared/application/services/logger-factory.service';
import { SensitiveDataMasker } from '../../../../../../../shared/application/services/sensitive-data-masker.service';
import { Uuid } from '../../../../../../../shared/application/services/uuid.service';
import { UserCreatedDomainEvent } from '../../../../../../../shared/domain/events/user-created.domain-event';
import { Sleep } from '../../../../../../../shared/infrastructure/decorators/sleep.decorator';
import { RabbitMQUserCreatedSubscribe } from '../../../../../../../shared/infrastructure/rabbitmq/decorators/rabbitmq-user-created-subscribe.decorator';
import { CreateMessageRequest } from '../dtos/create-message-request.dto';
import { MessageCreator } from './message-creator.service';

const logger = LoggerFactory.create('UserCreatedMessageSubscriber');

@Injectable()
export class UserCreatedMessageSubscriber {
	constructor(private readonly creator: MessageCreator) {}

	@RabbitMQUserCreatedSubscribe('users_created_create_message_queue')
	@Sleep(1500)
	async run(payload: UserCreatedDomainEvent): Promise<void> {
		try {
			const maskedData = SensitiveDataMasker.mask(payload.attributes);

			const request = CreateMessageRequest.create(
				Uuid.random(),
				payload.eventId,
				payload.eventName,
				maskedData,
			);

			await this.creator.run(request);
		} catch (error) {
			logger.error(`Error creating message in database to event <${payload.eventId}>`);
		}
	}
}
