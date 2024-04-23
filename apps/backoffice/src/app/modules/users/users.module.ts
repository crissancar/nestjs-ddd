import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RabbitMQModule } from '../../../../../shared/infrastructure/rabbitmq/rabbitmq.module';
import { BackofficeUserCreator } from './application/services/backoffice-user-creator.service';
import { UserCreatedFromAPISubscriber } from './application/services/user-created-from-api-subscriber.service';
import { BackofficeUserEntity } from './infrastructure/persistence/backoffice-user.entity';
import { BackofficeUserEntitySubscriber } from './infrastructure/persistence/backoffice-user-entity.subscriber';
import { TypeOrmBackofficeUserRepository } from './infrastructure/persistence/typeorm-backoffice-user.repository';
import { usersConfig } from './users.config';

const { repositoryInterface } = usersConfig.repository;

@Module({
	imports: [
		TypeOrmModule.forFeature([BackofficeUserEntity]),
		CqrsModule.forRoot(),
		RabbitMQModule.forRoot({ exchange: 'users_exchange' }),
	],
	controllers: [],
	providers: [
		BackofficeUserCreator,
		UserCreatedFromAPISubscriber,
		BackofficeUserEntitySubscriber,
		{ provide: repositoryInterface, useClass: TypeOrmBackofficeUserRepository },
	],
	exports: [],
})
export class UsersModule {}
