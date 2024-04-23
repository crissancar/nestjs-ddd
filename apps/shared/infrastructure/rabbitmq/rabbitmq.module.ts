import { AmqpConnection, RabbitMQModule as NestJSRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { DynamicModule, Module } from '@nestjs/common';

import { nestjsRabbitmqConfig } from './nestjs-rabbitmq.config';
import { RabbitMQEventBus } from './services/rabbitmq-event-bus.service';

export interface RabbitMQInstanceConfig {
	exchange: string;
}

@Module({})
export class RabbitMQModule {
	static forRoot(config: RabbitMQInstanceConfig): DynamicModule {
		return {
			module: RabbitMQModule,
			imports: [NestJSRabbitMQModule.forRoot(NestJSRabbitMQModule, nestjsRabbitmqConfig)],
			providers: [
				{
					provide: RabbitMQEventBus,
					inject: [AmqpConnection],
					useFactory: (amqpConnection: AmqpConnection): RabbitMQEventBus => {
						return new RabbitMQEventBus(config, amqpConnection);
					},
				},
			],
			exports: [RabbitMQEventBus],
		};
	}
}
